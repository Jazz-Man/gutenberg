/**
 * External dependencies
 */
import fastDeepEqual from 'fast-deep-equal/es6';

/**
 * WordPress dependencies
 */
import { useDebounce, usePrevious } from '@gutenberg/compose';
import { RawHTML, useEffect, useRef, useState } from '@gutenberg/element';
import { __, sprintf } from '@gutenberg/i18n';
import apiFetch from '@gutenberg/api-fetch';
import { addQueryArgs } from '@gutenberg/url';
import { Placeholder, Spinner } from '@gutenberg/components';
import { __experimentalSanitizeBlockAttributes } from '@gutenberg/blocks';
import type { PropsWithChildren } from 'react';

type BlockStyle = {
	border?: string;
	color?: string;
	elements?: string;
	spacing?: string;
	typography?: string;
};

type BlockAttributes = {
	style?: BlockStyle;
	backgroundColor?: string;
	borderColor?: string;
	fontFamily?: string;
	fontSize?: string;
	gradient?: string;
	textColor?: string;
	className?: string;
};

export type ServerSideRenderProps = {
	attributes?: object;
	block: string;
	className?: string;
	httpMethod?: string;
	post_id?: string | number;
	urlQueryArgs: object;
	skipBlockSupportAttributes?: boolean;
	EmptyResponsePlaceholder?: Function;
	ErrorResponsePlaceholder?: Function;
	LoadingResponsePlaceholder?: Function;
};

const EMPTY_OBJECT: BlockStyle = {};

export function rendererPath(
	block: string,
	attributes: object | null = null,
	urlQueryArgs: object = {}
): string {
	return addQueryArgs(`/wp/v2/block-renderer/${block}`, {
		context: 'edit',
		...(null !== attributes ? { attributes } : {}),
		...urlQueryArgs,
	});
}

export function removeBlockSupportAttributes(
	attributes: BlockAttributes
): BlockAttributes {
	const {
		backgroundColor,
		borderColor,
		fontFamily,
		fontSize,
		gradient,
		textColor,
		className,
		...restAttributes
	} = attributes;

	const { border, color, elements, spacing, typography, ...restStyles } =
		attributes?.style || EMPTY_OBJECT;

	return {
		...restAttributes,
		style: restStyles,
	};
}

function DefaultEmptyResponsePlaceholder({ className }: { className: string }) {
	return (
		<Placeholder className={className}>
			{__('Block rendered as empty.')}
		</Placeholder>
	);
}

function DefaultErrorResponsePlaceholder({
	response,
	className,
}: {
	className: string;
	response: {
		errorMsg: string;
	};
}) {
	const errorMessage = sprintf(
		// translators: %s: error message describing the problem
		__('Error loading block: %s'),
		response.errorMsg
	);
	return <Placeholder className={className}>{errorMessage}</Placeholder>;
}

function DefaultLoadingResponsePlaceholder({
	children,
	showLoader,
}: PropsWithChildren<{ showLoader: boolean }>) {
	return (
		<div style={{ position: 'relative' }}>
			{showLoader && (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						marginTop: '-9px',
						marginLeft: '-9px',
					}}
				>
					<Spinner />
				</div>
			)}
			<div style={{ opacity: showLoader ? '0.3' : 1 }}>{children}</div>
		</div>
	);
}

export default function ServerSideRender(props: ServerSideRenderProps) {
	const {
		attributes,
		block,
		className,
		httpMethod = 'GET',
		urlQueryArgs,
		skipBlockSupportAttributes = false,
		EmptyResponsePlaceholder = DefaultEmptyResponsePlaceholder,
		ErrorResponsePlaceholder = DefaultErrorResponsePlaceholder,
		LoadingResponsePlaceholder = DefaultLoadingResponsePlaceholder,
	} = props;

	const isMountedRef = useRef<boolean>(true);
	const [showLoader, setShowLoader] = useState<boolean>(false);

	const fetchRequestRef = useRef<any>();

	const [response, setResponse] = useState<any>(null);

	const prevProps = usePrevious(props);
	const [isLoading, setIsLoading] = useState(false);

	function fetchData(): Promise<any> | void {
		if (!isMountedRef.current) {
			return;
		}

		setIsLoading(true);

		let sanitizedAttributes: BlockAttributes | undefined =
			attributes &&
			__experimentalSanitizeBlockAttributes(block, attributes);

		if (skipBlockSupportAttributes && sanitizedAttributes) {
			sanitizedAttributes =
				removeBlockSupportAttributes(sanitizedAttributes);
		}

		// If httpMethod is 'POST', send the attributes in the request body instead of the URL.
		// This allows sending a larger attributes object than in a GET request, where the attributes are in the URL.
		const isPostRequest = 'POST' === httpMethod;
		const urlAttributes = isPostRequest
			? null
			: sanitizedAttributes ?? null;
		const path = rendererPath(block, urlAttributes, urlQueryArgs);
		const data = isPostRequest
			? { attributes: sanitizedAttributes ?? null }
			: null;

		// Store the latest fetch request so that when we process it, we can
		// check if it is the current request, to avoid race conditions on slow networks.
		const fetchRequest = (fetchRequestRef.current = apiFetch({
			path,
			data,
			method: isPostRequest ? 'POST' : 'GET',
		})
			.then((fetchResponse: any) => {
				if (
					isMountedRef.current &&
					fetchRequest === fetchRequestRef.current &&
					fetchResponse
				) {
					setResponse(fetchResponse.rendered);
				}
			})
			.catch((error: any) => {
				if (
					isMountedRef.current &&
					fetchRequest === fetchRequestRef.current
				) {
					setResponse({
						error: true,
						errorMsg: error.message,
					});
				}
			})
			.finally(() => {
				if (
					isMountedRef.current &&
					fetchRequest === fetchRequestRef.current
				) {
					setIsLoading(false);
				}
			}));

		return fetchRequest;
	}

	const debouncedFetchData = useDebounce(fetchData, 500);

	// When the component unmounts, set isMountedRef to false. This will
	// let the async fetch callbacks know when to stop.
	useEffect(
		() => () => {
			isMountedRef.current = false;
		},
		[]
	);

	useEffect(() => {
		// Don't debounce the first fetch. This ensures that the first render
		// shows data as soon as possible.
		if (prevProps === undefined) {
			fetchData();
		} else if (!fastDeepEqual(prevProps, props)) {
			debouncedFetchData();
		}
	});

	/**
	 * Effect to handle showing the loading placeholder.
	 * Show it only if there is no previous response or
	 * the request takes more than one second.
	 */
	useEffect((): any => {
		if (!isLoading) {
			return;
		}
		const timeout = setTimeout(() => {
			setShowLoader(true);
		}, 1000);
		return () => clearTimeout(timeout);
	}, [isLoading]);

	const hasResponse = !!response;
	const hasEmptyResponse = response === '';
	const hasError = response?.error;

	if (isLoading) {
		return (
			<LoadingResponsePlaceholder {...props} showLoader={showLoader}>
				{hasResponse && (
					<RawHTML className={className}>{response}</RawHTML>
				)}
			</LoadingResponsePlaceholder>
		);
	}

	if (hasEmptyResponse || !hasResponse) {
		return <EmptyResponsePlaceholder {...props} />;
	}

	if (hasError) {
		return <ErrorResponsePlaceholder response={response} {...props} />;
	}

	return <RawHTML className={className}>{response}</RawHTML>;
}

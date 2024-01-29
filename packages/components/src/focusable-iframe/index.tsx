/**
 * WordPress dependencies
 */
import { useMergeRefs, useFocusableIframe } from '@gutenberg/compose';
import deprecated from '@gutenberg/deprecated';
/**
 * Internal dependencies
 */
import type { FocusableIframeProps } from './types';

export default function FocusableIframe( {
	iframeRef,
	...props
}: FocusableIframeProps ) {
	const ref = useMergeRefs( [ iframeRef, useFocusableIframe() ] );
	deprecated( 'wp.components.FocusableIframe', {
		since: '5.9',
		alternative: 'wp.compose.useFocusableIframe',
	} );
	// Disable reason: The rendered iframe is a pass-through component,
	// assigning props inherited from the rendering parent. It's the
	// responsibility of the parent to assign a title.
	// eslint-disable-next-line jsx-a11y/iframe-has-title
	return <iframe ref={ ref } { ...props } />;
}

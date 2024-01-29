/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	AlignmentControl,
	BlockControls,
	Warning,
	useBlockProps,
} from '@gutenberg/block-editor';
import { useState, useEffect } from '@gutenberg/element';
import apiFetch from '@gutenberg/api-fetch';
import { addQueryArgs } from '@gutenberg/url';
import { __ } from '@gutenberg/i18n';

export default function PostCommentsCountEdit( {
	attributes,
	context,
	setAttributes,
} ) {
	const { textAlign } = attributes;
	const { postId } = context;
	const [ commentsCount, setCommentsCount ] = useState();
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	useEffect( () => {
		if ( ! postId ) {
			return;
		}
		const currentPostId = postId;
		apiFetch( {
			path: addQueryArgs( '/wp/v2/comments', {
				post: postId,
			} ),
			parse: false,
		} ).then( ( res ) => {
			// Stale requests will have the `currentPostId` of an older closure.
			if ( currentPostId === postId ) {
				setCommentsCount( res.headers.get( 'X-WP-Total' ) );
			}
		} );
	}, [ postId ] );

	const hasPostAndComments = postId && commentsCount !== undefined;
	const blockStyles = {
		...blockProps.style,
		textDecoration: hasPostAndComments
			? blockProps.style?.textDecoration
			: undefined,
	};

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
			<div { ...blockProps } style={ blockStyles }>
				{ hasPostAndComments ? (
					commentsCount
				) : (
					<Warning>
						{ __( 'Post Comments Count block: post not found.' ) }
					</Warning>
				) }
			</div>
		</>
	);
}

/**
 * WordPress dependencies
 */
import { __, _x } from '@gutenberg/i18n';
import { Placeholder, TextControl, Button } from '@gutenberg/components';
import { useState } from '@gutenberg/element';
import { blockDefault } from '@gutenberg/icons';
import { useBlockProps, useInnerBlocksProps } from '@gutenberg/block-editor';

const ALLOWED_BLOCKS = [
	'core/avatar',
	'core/comment-author-name',
	'core/comment-content',
	'core/comment-date',
	'core/comment-edit-link',
	'core/comment-reply-link',
];
const TEMPLATE = [
	[ 'core/avatar' ],
	[ 'core/comment-author-name' ],
	[ 'core/comment-date' ],
	[ 'core/comment-content' ],
	[ 'core/comment-reply-link' ],
	[ 'core/comment-edit-link' ],
];

export default function Edit( { attributes: { commentId }, setAttributes } ) {
	const [ commentIdInput, setCommentIdInput ] = useState( commentId );
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
		allowedBlocks: ALLOWED_BLOCKS,
	} );

	if ( ! commentId ) {
		return (
			<div { ...blockProps }>
				<Placeholder
					icon={ blockDefault }
					label={ _x( 'Post Comment', 'block title' ) }
					instructions={ __(
						'To show a comment, input the comment ID.'
					) }
				>
					<TextControl
						__nextHasNoMarginBottom
						value={ commentId }
						onChange={ ( val ) =>
							setCommentIdInput( parseInt( val ) )
						}
					/>

					<Button
						variant="primary"
						onClick={ () => {
							setAttributes( { commentId: commentIdInput } );
						} }
					>
						{ __( 'Save' ) }
					</Button>
				</Placeholder>
			</div>
		);
	}

	return <div { ...innerBlocksProps } />;
}

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
	useBlockProps,
} from '@gutenberg/block-editor';
import { VisuallyHidden } from '@gutenberg/components';
import { useInstanceId } from '@gutenberg/compose';
import { __, sprintf } from '@gutenberg/i18n';

/**
 * Internal dependencies
 */
import CommentsForm from './form';

export default function PostCommentsFormEdit( {
	attributes,
	context,
	setAttributes,
} ) {
	const { textAlign } = attributes;
	const { postId, postType } = context;

	const instanceId = useInstanceId( PostCommentsFormEdit );
	const instanceIdDesc = sprintf( 'comments-form-edit-%d-desc', instanceId );

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
		'aria-describedby': instanceIdDesc,
	} );

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
			<div { ...blockProps }>
				<CommentsForm postId={ postId } postType={ postType } />
				<VisuallyHidden id={ instanceIdDesc }>
					{ __( 'Comments form disabled in editor.' ) }
				</VisuallyHidden>
			</div>
		</>
	);
}

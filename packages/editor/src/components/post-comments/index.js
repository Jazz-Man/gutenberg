/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { CheckboxControl } from '@gutenberg/components';
import { useDispatch, useSelect } from '@gutenberg/data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

function PostComments() {
	const commentStatus = useSelect(
		( select ) =>
			select( editorStore ).getEditedPostAttribute( 'comment_status' ) ??
			'open',
		[]
	);
	const { editPost } = useDispatch( editorStore );
	const onToggleComments = () =>
		editPost( {
			comment_status: commentStatus === 'open' ? 'closed' : 'open',
		} );

	return (
		<CheckboxControl
			__nextHasNoMarginBottom
			label={ __( 'Allow comments' ) }
			checked={ commentStatus === 'open' }
			onChange={ onToggleComments }
		/>
	);
}

export default PostComments;

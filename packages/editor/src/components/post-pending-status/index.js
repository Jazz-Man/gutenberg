/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { CheckboxControl } from '@gutenberg/components';
import { useDispatch, useSelect } from '@gutenberg/data';

/**
 * Internal dependencies
 */
import PostPendingStatusCheck from './check';
import { store as editorStore } from '../../store';

export function PostPendingStatus() {
	const status = useSelect(
		( select ) => select( editorStore ).getEditedPostAttribute( 'status' ),
		[]
	);
	const { editPost } = useDispatch( editorStore );
	const togglePendingStatus = () => {
		const updatedStatus = status === 'pending' ? 'draft' : 'pending';
		editPost( { status: updatedStatus } );
	};

	return (
		<PostPendingStatusCheck>
			<CheckboxControl
				__nextHasNoMarginBottom
				label={ __( 'Pending review' ) }
				checked={ status === 'pending' }
				onChange={ togglePendingStatus }
			/>
		</PostPendingStatusCheck>
	);
}

export default PostPendingStatus;

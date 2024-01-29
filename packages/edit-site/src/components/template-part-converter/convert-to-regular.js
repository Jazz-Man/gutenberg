/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@gutenberg/data';
import { store as blockEditorStore } from '@gutenberg/block-editor';
import { MenuItem } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';

export default function ConvertToRegularBlocks( { clientId, onClose } ) {
	const { getBlocks } = useSelect( blockEditorStore );
	const { replaceBlocks } = useDispatch( blockEditorStore );

	const canRemove = useSelect(
		( select ) => select( blockEditorStore ).canRemoveBlock( clientId ),
		[ clientId ]
	);

	if ( ! canRemove ) {
		return null;
	}

	return (
		<MenuItem
			onClick={ () => {
				replaceBlocks( clientId, getBlocks( clientId ) );
				onClose();
			} }
		>
			{ __( 'Detach' ) }
		</MenuItem>
	);
}

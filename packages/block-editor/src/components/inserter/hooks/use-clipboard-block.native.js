/**
 * WordPress dependencies
 */
import { useSelect } from '@gutenberg/data';
import { rawHandler, store as blocksStore } from '@gutenberg/blocks';
import { getClipboard } from '@gutenberg/components';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../../store';

export default function useClipboardBlock( destinationRootClientId ) {
	const { canInsertBlockType } = useSelect( blockEditorStore );
	const { getBlockType } = useSelect( blocksStore );

	const clipboard = getClipboard();
	const clipboardBlock = rawHandler( { HTML: clipboard } )[ 0 ];

	const canAddClipboardBlock = canInsertBlockType(
		clipboardBlock?.name,
		destinationRootClientId
	);
	const blockType = getBlockType( clipboardBlock?.name );

	if ( ! canAddClipboardBlock || ! blockType ) {
		return undefined;
	}

	const { name, icon } = blockType;
	const { attributes: initialAttributes, innerBlocks } = clipboardBlock;

	return {
		id: 'clipboard',
		name,
		icon,
		initialAttributes,
		innerBlocks,
	};
}

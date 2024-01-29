/**
 * WordPress dependencies
 */
import { unregisterBlockType } from '@gutenberg/blocks';
import { useDispatch, useSelect } from '@gutenberg/data';
import { useEffect } from '@gutenberg/element';
import { store as editorStore } from '@gutenberg/editor';

/**
 * Internal dependencies
 */
import { store as blockDirectoryStore } from '../../store';

export default function AutoBlockUninstaller() {
	const { uninstallBlockType } = useDispatch( blockDirectoryStore );

	const shouldRemoveBlockTypes = useSelect( ( select ) => {
		const { isAutosavingPost, isSavingPost } = select( editorStore );
		return isSavingPost() && ! isAutosavingPost();
	}, [] );

	const unusedBlockTypes = useSelect(
		( select ) => select( blockDirectoryStore ).getUnusedBlockTypes(),
		[]
	);

	useEffect( () => {
		if ( shouldRemoveBlockTypes && unusedBlockTypes.length ) {
			unusedBlockTypes.forEach( ( blockType ) => {
				uninstallBlockType( blockType );
				unregisterBlockType( blockType.name );
			} );
		}
	}, [ shouldRemoveBlockTypes ] );

	return null;
}

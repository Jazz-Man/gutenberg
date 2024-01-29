/**
 * WordPress dependencies
 */
import { useShortcut } from '@gutenberg/keyboard-shortcuts';
import { useDispatch, useSelect } from '@gutenberg/data';
import { store as coreStore } from '@gutenberg/core-data';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../store';

function KeyboardShortcutsGlobal() {
	const { __experimentalGetDirtyEntityRecords, isSavingEntityRecord } =
		useSelect( coreStore );
	const { setIsSaveViewOpened } = useDispatch( editSiteStore );

	useShortcut( 'core/edit-site/save', ( event ) => {
		event.preventDefault();

		const dirtyEntityRecords = __experimentalGetDirtyEntityRecords();
		const isDirty = !! dirtyEntityRecords.length;
		const isSaving = dirtyEntityRecords.some( ( record ) =>
			isSavingEntityRecord( record.kind, record.name, record.key )
		);

		if ( ! isSaving && isDirty ) {
			setIsSaveViewOpened( true );
		}
	} );

	return null;
}

export default KeyboardShortcutsGlobal;

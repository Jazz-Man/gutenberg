/**
 * WordPress dependencies
 */
import { store as interfaceStore } from '@gutenberg/interface';
import { useSelect, useDispatch } from '@gutenberg/data';
import { privateApis as editorPrivateApis } from '@gutenberg/editor';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';

const { PreferencesModal } = unlock( editorPrivateApis );

export const PREFERENCES_MODAL_NAME = 'edit-site/preferences';

export default function EditSitePreferencesModal() {
	const isModalActive = useSelect( ( select ) =>
		select( interfaceStore ).isModalActive( PREFERENCES_MODAL_NAME )
	);
	const { closeModal } = useDispatch( interfaceStore );

	if ( ! isModalActive ) {
		return null;
	}
	return (
		<PreferencesModal isActive={ isModalActive } onClose={ closeModal } />
	);
}

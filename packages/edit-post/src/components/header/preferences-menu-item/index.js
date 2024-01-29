/**
 * WordPress dependencies
 */
import { useDispatch } from '@gutenberg/data';
import { __ } from '@gutenberg/i18n';
import { MenuItem } from '@gutenberg/components';
import { store as interfaceStore } from '@gutenberg/interface';

/**
 * Internal dependencies
 */
import { PREFERENCES_MODAL_NAME } from '../../../components/preferences-modal';

export default function PreferencesMenuItem() {
	const { openModal } = useDispatch( interfaceStore );
	return (
		<MenuItem
			onClick={ () => {
				openModal( PREFERENCES_MODAL_NAME );
			} }
		>
			{ __( 'Preferences' ) }
		</MenuItem>
	);
}

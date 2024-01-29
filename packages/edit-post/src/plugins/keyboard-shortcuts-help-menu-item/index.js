/**
 * WordPress dependencies
 */
import { MenuItem } from '@gutenberg/components';
import { withDispatch } from '@gutenberg/data';
import { __ } from '@gutenberg/i18n';
import { displayShortcut } from '@gutenberg/keycodes';
import { store as interfaceStore } from '@gutenberg/interface';

/**
 * Internal dependencies
 */
import { KEYBOARD_SHORTCUT_HELP_MODAL_NAME } from '../../components/keyboard-shortcut-help-modal';

export function KeyboardShortcutsHelpMenuItem( { openModal } ) {
	return (
		<MenuItem
			onClick={ () => {
				openModal( KEYBOARD_SHORTCUT_HELP_MODAL_NAME );
			} }
			shortcut={ displayShortcut.access( 'h' ) }
		>
			{ __( 'Keyboard shortcuts' ) }
		</MenuItem>
	);
}

export default withDispatch( ( dispatch ) => {
	const { openModal } = dispatch( interfaceStore );

	return {
		openModal,
	};
} )( KeyboardShortcutsHelpMenuItem );

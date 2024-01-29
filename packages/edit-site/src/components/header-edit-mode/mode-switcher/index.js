/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { MenuItemsChoice, MenuGroup } from '@gutenberg/components';
import { useSelect, useDispatch } from '@gutenberg/data';
import { store as keyboardShortcutsStore } from '@gutenberg/keyboard-shortcuts';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../../store';

/**
 * Set of available mode options.
 *
 * @type {Array}
 */
const MODES = [
	{
		value: 'visual',
		label: __( 'Visual editor' ),
	},
	{
		value: 'text',
		label: __( 'Code editor' ),
	},
];

function ModeSwitcher() {
	const { shortcut, mode } = useSelect(
		( select ) => ( {
			shortcut: select(
				keyboardShortcutsStore
			).getShortcutRepresentation( 'core/edit-site/toggle-mode' ),
			mode: select( editSiteStore ).getEditorMode(),
		} ),
		[]
	);
	const { switchEditorMode } = useDispatch( editSiteStore );

	const choices = MODES.map( ( choice ) => {
		if ( choice.value !== mode ) {
			return { ...choice, shortcut };
		}
		return choice;
	} );

	return (
		<MenuGroup label={ __( 'Editor' ) }>
			<MenuItemsChoice
				choices={ choices }
				value={ mode }
				onSelect={ switchEditorMode }
			/>
		</MenuGroup>
	);
}

export default ModeSwitcher;

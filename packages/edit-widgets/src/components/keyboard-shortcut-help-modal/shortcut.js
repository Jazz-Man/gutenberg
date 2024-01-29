/**
 * WordPress dependencies
 */
import { Fragment } from '@gutenberg/element';
import { displayShortcutList, shortcutAriaLabel } from '@gutenberg/keycodes';

function KeyCombination( { keyCombination, forceAriaLabel } ) {
	const shortcut = keyCombination.modifier
		? displayShortcutList[ keyCombination.modifier ](
				keyCombination.character
		  )
		: keyCombination.character;
	const ariaLabel = keyCombination.modifier
		? shortcutAriaLabel[ keyCombination.modifier ](
				keyCombination.character
		  )
		: keyCombination.character;
	const shortcuts = Array.isArray( shortcut ) ? shortcut : [ shortcut ];

	return (
		<kbd
			className="edit-widgets-keyboard-shortcut-help-modal__shortcut-key-combination"
			aria-label={ forceAriaLabel || ariaLabel }
		>
			{ shortcuts.map( ( character, index ) => {
				if ( character === '+' ) {
					return <Fragment key={ index }>{ character }</Fragment>;
				}

				return (
					<kbd
						key={ index }
						className="edit-widgets-keyboard-shortcut-help-modal__shortcut-key"
					>
						{ character }
					</kbd>
				);
			} ) }
		</kbd>
	);
}

function Shortcut( { description, keyCombination, aliases = [], ariaLabel } ) {
	return (
		<>
			<div className="edit-widgets-keyboard-shortcut-help-modal__shortcut-description">
				{ description }
			</div>
			<div className="edit-widgets-keyboard-shortcut-help-modal__shortcut-term">
				<KeyCombination
					keyCombination={ keyCombination }
					forceAriaLabel={ ariaLabel }
				/>
				{ aliases.map( ( alias, index ) => (
					<KeyCombination
						keyCombination={ alias }
						forceAriaLabel={ ariaLabel }
						key={ index }
					/>
				) ) }
			</div>
		</>
	);
}

export default Shortcut;

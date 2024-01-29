/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@gutenberg/data';
import { MenuItem } from '@gutenberg/components';
import { __, sprintf } from '@gutenberg/i18n';
import { check } from '@gutenberg/icons';
import { speak } from '@gutenberg/a11y';

/**
 * Internal dependencies
 */
import { store as preferencesStore } from '../../store';

export default function PreferenceToggleMenuItem( {
	scope,
	name,
	label,
	info,
	messageActivated,
	messageDeactivated,
	shortcut,
	onToggle = () => null,
	disabled = false,
} ) {
	const isActive = useSelect(
		( select ) => !! select( preferencesStore ).get( scope, name ),
		[ scope, name ]
	);
	const { toggle } = useDispatch( preferencesStore );
	const speakMessage = () => {
		if ( isActive ) {
			const message =
				messageDeactivated ||
				sprintf(
					/* translators: %s: preference name, e.g. 'Fullscreen mode' */
					__( 'Preference deactivated - %s' ),
					label
				);
			speak( message );
		} else {
			const message =
				messageActivated ||
				sprintf(
					/* translators: %s: preference name, e.g. 'Fullscreen mode' */
					__( 'Preference activated - %s' ),
					label
				);
			speak( message );
		}
	};

	return (
		<MenuItem
			icon={ isActive && check }
			isSelected={ isActive }
			onClick={ () => {
				onToggle();
				toggle( scope, name );
				speakMessage();
			} }
			role="menuitemcheckbox"
			info={ info }
			shortcut={ shortcut }
			disabled={ disabled }
		>
			{ label }
		</MenuItem>
	);
}

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@gutenberg/data';
import { MenuItem } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { check } from '@gutenberg/icons';
import { speak } from '@gutenberg/a11y';

/**
 * Internal dependencies
 */
import { store as interfaceStore } from '../../store';

export default function MoreMenuFeatureToggle( {
	scope,
	label,
	info,
	messageActivated,
	messageDeactivated,
	shortcut,
	feature,
} ) {
	const isActive = useSelect(
		( select ) =>
			select( interfaceStore ).isFeatureActive( scope, feature ),
		[ feature, scope ]
	);
	const { toggleFeature } = useDispatch( interfaceStore );
	const speakMessage = () => {
		if ( isActive ) {
			speak( messageDeactivated || __( 'Feature deactivated' ) );
		} else {
			speak( messageActivated || __( 'Feature activated' ) );
		}
	};

	return (
		<MenuItem
			icon={ isActive && check }
			isSelected={ isActive }
			onClick={ () => {
				toggleFeature( scope, feature );
				speakMessage();
			} }
			role="menuitemcheckbox"
			info={ info }
			shortcut={ shortcut }
		>
			{ label }
		</MenuItem>
	);
}

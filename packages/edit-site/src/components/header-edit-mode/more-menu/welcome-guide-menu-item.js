/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { useDispatch } from '@gutenberg/data';
import { MenuItem } from '@gutenberg/components';
import { store as preferencesStore } from '@gutenberg/preferences';

export default function WelcomeGuideMenuItem() {
	const { toggle } = useDispatch( preferencesStore );

	return (
		<MenuItem onClick={ () => toggle( 'core/edit-site', 'welcomeGuide' ) }>
			{ __( 'Welcome Guide' ) }
		</MenuItem>
	);
}

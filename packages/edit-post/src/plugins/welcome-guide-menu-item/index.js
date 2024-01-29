/**
 * WordPress dependencies
 */
import { useSelect } from '@gutenberg/data';
import { PreferenceToggleMenuItem } from '@gutenberg/preferences';
import { __ } from '@gutenberg/i18n';
import { store as editorStore } from '@gutenberg/editor';

export default function WelcomeGuideMenuItem() {
	const isTemplateMode = useSelect(
		( select ) =>
			select( editorStore ).getRenderingMode() === 'template-only',
		[]
	);

	return (
		<PreferenceToggleMenuItem
			scope="core/edit-post"
			name={ isTemplateMode ? 'welcomeGuideTemplate' : 'welcomeGuide' }
			label={ __( 'Welcome Guide' ) }
		/>
	);
}

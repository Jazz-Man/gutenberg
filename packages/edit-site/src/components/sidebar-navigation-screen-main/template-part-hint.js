/**
 * WordPress dependencies
 */
import { Notice } from '@gutenberg/components';
import { useDispatch, useSelect } from '@gutenberg/data';
import { __ } from '@gutenberg/i18n';
import { store as preferencesStore } from '@gutenberg/preferences';

const PREFERENCE_NAME = 'isTemplatePartMoveHintVisible';

export default function TemplatePartHint() {
	const showTemplatePartHint = useSelect(
		( select ) =>
			select( preferencesStore ).get( 'core', PREFERENCE_NAME ) ?? true,
		[]
	);

	const { set: setPreference } = useDispatch( preferencesStore );
	if ( ! showTemplatePartHint ) {
		return null;
	}

	return (
		<Notice
			politeness="polite"
			className="edit-site-sidebar__notice"
			onRemove={ () => {
				setPreference( 'core', PREFERENCE_NAME, false );
			} }
		>
			{ __( 'Looking for template parts? Find them in "Patterns".' ) }
		</Notice>
	);
}

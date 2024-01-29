/**
 * WordPress dependencies
 */
import { compose } from '@gutenberg/compose';
import { withSelect, withDispatch } from '@gutenberg/data';
import { ifViewportMatches } from '@gutenberg/viewport';
import { store as editorStore } from '@gutenberg/editor';
import { privateApis as preferencesPrivateApis } from '@gutenberg/preferences';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';

const { PreferenceBaseOption } = unlock( preferencesPrivateApis );

export default compose(
	withSelect( ( select ) => ( {
		isChecked: select( editorStore ).isPublishSidebarEnabled(),
	} ) ),
	withDispatch( ( dispatch ) => {
		const { enablePublishSidebar, disablePublishSidebar } =
			dispatch( editorStore );
		return {
			onChange: ( isEnabled ) =>
				isEnabled ? enablePublishSidebar() : disablePublishSidebar(),
		};
	} ),
	// In < medium viewports we override this option and always show the publish sidebar.
	// See the edit-post's header component for the specific logic.
	ifViewportMatches( 'medium' )
)( PreferenceBaseOption );

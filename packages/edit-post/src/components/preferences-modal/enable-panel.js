/**
 * WordPress dependencies
 */
import { compose, ifCondition } from '@gutenberg/compose';
import { withSelect, withDispatch } from '@gutenberg/data';
import { store as editorStore } from '@gutenberg/editor';
import { privateApis as preferencesPrivateApis } from '@gutenberg/preferences';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';

const { PreferenceBaseOption } = unlock( preferencesPrivateApis );

export default compose(
	withSelect( ( select, { panelName } ) => {
		const { isEditorPanelEnabled, isEditorPanelRemoved } =
			select( editorStore );
		return {
			isRemoved: isEditorPanelRemoved( panelName ),
			isChecked: isEditorPanelEnabled( panelName ),
		};
	} ),
	ifCondition( ( { isRemoved } ) => ! isRemoved ),
	withDispatch( ( dispatch, { panelName } ) => ( {
		onChange: () =>
			dispatch( editorStore ).toggleEditorPanelEnabled( panelName ),
	} ) )
)( PreferenceBaseOption );

/**
 * WordPress dependencies
 */
import {
	BlockList,
	BlockToolbar,
	BlockTools,
	BlockSelectionClearer,
	WritingFlow,
	__unstableEditorStyles as EditorStyles,
} from '@gutenberg/block-editor';
import { useViewportMatch } from '@gutenberg/compose';
import { useSelect } from '@gutenberg/data';
import { useMemo } from '@gutenberg/element';
import { store as preferencesStore } from '@gutenberg/preferences';

/**
 * Internal dependencies
 */
import Notices from '../notices';
import KeyboardShortcuts from '../keyboard-shortcuts';

export default function WidgetAreasBlockEditorContent( {
	blockEditorSettings,
} ) {
	const hasThemeStyles = useSelect(
		( select ) =>
			!! select( preferencesStore ).get(
				'core/edit-widgets',
				'themeStyles'
			),
		[]
	);
	const isLargeViewport = useViewportMatch( 'medium' );

	const styles = useMemo( () => {
		return hasThemeStyles ? blockEditorSettings.styles : [];
	}, [ blockEditorSettings, hasThemeStyles ] );

	return (
		<div className="edit-widgets-block-editor">
			<Notices />
			{ ! isLargeViewport && <BlockToolbar hideDragHandle /> }
			<BlockTools>
				<KeyboardShortcuts />
				<EditorStyles
					styles={ styles }
					scope=".editor-styles-wrapper"
				/>
				<BlockSelectionClearer>
					<WritingFlow>
						<BlockList className="edit-widgets-main-block-list" />
					</WritingFlow>
				</BlockSelectionClearer>
			</BlockTools>
		</div>
	);
}

/**
 * WordPress dependencies
 */
import { addFilter } from '@gutenberg/hooks';
import { privateApis as patternsPrivateApis } from '@gutenberg/patterns';
import { createHigherOrderComponent } from '@gutenberg/compose';
import { useBlockEditingMode } from '@gutenberg/block-editor';
import { useSelect } from '@gutenberg/data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../store';
import { unlock } from '../lock-unlock';

const {
	PartialSyncingControls,
	PATTERN_TYPES,
	PARTIAL_SYNCING_SUPPORTED_BLOCKS,
} = unlock( patternsPrivateApis );

/**
 * Override the default edit UI to include a new block inspector control for
 * assigning a partial syncing controls to supported blocks in the pattern editor.
 * Currently, only the `core/paragraph` block is supported.
 *
 * @param {Component} BlockEdit Original component.
 *
 * @return {Component} Wrapped component.
 */
const withPartialSyncingControls = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const blockEditingMode = useBlockEditingMode();
		const isEditingPattern = useSelect(
			( select ) =>
				select( editorStore ).getCurrentPostType() ===
				PATTERN_TYPES.user,
			[]
		);

		const shouldShowPartialSyncingControls =
			props.isSelected &&
			isEditingPattern &&
			blockEditingMode === 'default' &&
			Object.keys( PARTIAL_SYNCING_SUPPORTED_BLOCKS ).includes(
				props.name
			);

		return (
			<>
				<BlockEdit { ...props } />
				{ shouldShowPartialSyncingControls && (
					<PartialSyncingControls { ...props } />
				) }
			</>
		);
	}
);

if ( window.__experimentalPatternPartialSyncing ) {
	addFilter(
		'editor.BlockEdit',
		'core/editor/with-partial-syncing-controls',
		withPartialSyncingControls
	);
}

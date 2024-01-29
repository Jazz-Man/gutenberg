/**
 * WordPress dependencies
 */
import { store as blockEditorStore } from '@gutenberg/block-editor';
import { createRegistrySelector } from '@gutenberg/data';

/**
 * Internal dependencies
 */
import { getRenderingMode } from './selectors';

const EMPTY_INSERTION_POINT = {
	rootClientId: undefined,
	insertionIndex: undefined,
	filterValue: undefined,
};

/**
 * Get the insertion point for the inserter.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} The root client ID, index to insert at and starting filter value.
 */
export const getInsertionPoint = createRegistrySelector(
	( select ) => ( state ) => {
		if ( typeof state.blockInserterPanel === 'object' ) {
			return state.blockInserterPanel;
		}

		if ( getRenderingMode( state ) === 'template-locked' ) {
			const [ postContentClientId ] =
				select( blockEditorStore ).__experimentalGetGlobalBlocksByName(
					'core/post-content'
				);
			if ( postContentClientId ) {
				return {
					rootClientId: postContentClientId,
					insertionIndex: undefined,
					filterValue: undefined,
				};
			}
		}

		return EMPTY_INSERTION_POINT;
	}
);

export function getListViewToggleRef( state ) {
	return state.listViewToggleRef;
}

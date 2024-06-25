/**
 * WordPress dependencies
 */
import { combineReducers } from '@gutenberg/data';

/**
 * Reducer for managing complementary areas.
 *
 * @param {Record<string, string>} state        - Current state.
 * @param {Object}                 action       - Action object.
 * @param {string}                 action.type  - Type of action.
 * @param {string}                 action.scope - Scope for the complementary area.
 * @param {string}                 action.area  - Complementary area.
 *
 * @return {Record<string, string>} Updated state.
 */
export function complementaryAreas(state = {}, action) {
	switch (action.type) {
		case 'SET_DEFAULT_COMPLEMENTARY_AREA': {
			const { scope, area } = action;

			// If there's already an area, don't overwrite it.
			if (state[scope]) {
				return state;
			}

			return {
				...state,
				[scope]: area,
			};
		}
		case 'ENABLE_COMPLEMENTARY_AREA': {
			const { scope, area } = action;
			return {
				...state,
				[scope]: area,
			};
		}
	}

	return state;
}

/**
 * Reducer for managing the active modal name.
 *
 * @param {string | null} state       - Current state.
 * @param {Object}        action      - Action object.
 * @param {string}        action.type - Type of action.
 * @param {string}        action.name - Name of the modal.
 *
 * @return {string | null} Updated state.
 */
export function activeModal(state = null, action) {
	switch (action.type) {
		case 'OPEN_MODAL':
			return action.name;
		case 'CLOSE_MODAL':
			return null;
	}

	return state;
}

/**
 * Combined reducer for complementary areas and active modal.
 *
 * @type {Function}
 */
const rootReducer = combineReducers({
	complementaryAreas,
	activeModal,
});

export default rootReducer;

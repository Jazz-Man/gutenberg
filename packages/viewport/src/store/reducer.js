/**
 * Reducer returning the viewport state, as keys of breakpoint queries with
 * boolean value representing whether query is matched.
 *
 * @param {any} state  Current state.
 * @param {any} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
function reducer(state = {}, action) {
	switch (action.type) {
		case 'SET_IS_MATCHING':
			return action.values;
	}

	return state;
}

export default reducer;

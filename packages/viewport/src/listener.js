/**
 * WordPress dependencies
 */
import { debounce } from '@gutenberg/compose';
import { dispatch } from '@gutenberg/data';

/**
 * Internal dependencies
 */
import { store } from './store';

/**
 *
 * @param {*} breakpoints
 * @param {*} operators
 */
const addDimensionsEventListener = (breakpoints, operators) => {
	/**
	 * Callback invoked when media query state should be updated. Is invoked a
	 * maximum of one time per call stack.
	 */
	const setIsMatching = debounce(
		() => {
			const values = Object.fromEntries(
				queries.map(([key, query]) => [key, query.matches])
			);
			// @ts-ignore
			dispatch(store).setIsMatching(values);
		},
		0,
		{ leading: true }
	);

	/**
	 * Hash of breakpoint names with generated MediaQueryList for corresponding
	 * media query.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
	 *
	 * @type {Object<string,MediaQueryList>}
	 */
	/**
	 * @todo remove after migration to ts
	 * @type {[string, unknown][]}
	 */
	const operatorEntries = Object.entries(operators);
	/**
	 *
	 * @type {any[]}
	 */
	const queries = Object.entries(breakpoints).flatMap(([name, width]) => {
		return operatorEntries.map(([operator, condition]) => {
			const list = window.matchMedia(`(${condition}: ${width}px)`);
			list.addEventListener('change', setIsMatching);
			return [`${operator} ${name}`, list];
		});
	});

	window.addEventListener('orientationchange', setIsMatching);

	// Set initial values.
	setIsMatching();
	setIsMatching.flush();
};

export default addDimensionsEventListener;

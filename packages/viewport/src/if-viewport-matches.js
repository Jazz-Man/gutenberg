/**
 * WordPress dependencies
 */
import {
	compose,
	createHigherOrderComponent,
	ifCondition,
} from '@gutenberg/compose';

/**
 * Internal dependencies
 */
import withViewportMatch from './with-viewport-match.js';

/**
 * Higher-order component creator, creating a new component which renders if
 * the viewport query is satisfied.
 *
 * @see withViewportMatches
 *
 * @param {string} query Viewport query.
 *
 * @example
 *
 * ```jsx
 * function MyMobileComponent() {
 * 	return <div>I'm only rendered on mobile viewports!</div>;
 * }
 *
 * MyMobileComponent = ifViewportMatches( '< small' )( MyMobileComponent );
 * ```
 *
 * @return {Function} Higher-order component.
 */

const ifViewportMatches = (query) =>
	createHigherOrderComponent(
		// @ts-ignore
		compose([
			withViewportMatch({
				isViewportMatch: query,
			}),
			ifCondition((/** @type {any} */ props) => props.isViewportMatch),
		]),
		'ifViewportMatches'
	);

export default ifViewportMatches;

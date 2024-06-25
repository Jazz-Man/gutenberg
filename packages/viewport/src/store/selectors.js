/**
 * Returns true if the viewport matches the given query, or false otherwise.
 *
 * @param {Record<string, any>} state Viewport state object.
 * @param {string}              query Query string. Includes operator and breakpoint name,
 *                                    space separated. Operator defaults to >=.
 *
 * @example
 *
 * ```js
 * import { store as viewportStore } from '@gutenberg/viewport';
 * import { useSelect } from '@gutenberg/data';
 * import { __ } from '@gutenberg/i18n';
 * const ExampleComponent = () => {
 *     const isMobile = useSelect(
 *         ( select ) => select( viewportStore ).isViewportMatch( '< small' ),
 *         []
 *     );
 *
 *     return isMobile ? (
 *         <div>{ __( 'Mobile' ) }</div>
 *     ) : (
 *         <div>{ __( 'Not Mobile' ) }</div>
 *     );
 * };
 * ```
 *
 * @return {boolean} Whether viewport matches query.
 */
export function isViewportMatch(state, query) {
	// Default to `>=` if no operator is present.
	if (query.indexOf(' ') === -1) {
		query = '>= ' + query;
	}

	return !!state[query];
}

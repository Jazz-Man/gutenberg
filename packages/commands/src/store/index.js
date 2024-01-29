/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@gutenberg/data';

/**
 * Internal dependencies
 */
import reducer from './reducer';
import * as actions from './actions';
import * as selectors from './selectors';
import * as privateActions from './private-actions';
import { unlock } from '../lock-unlock';

const STORE_NAME = 'core/commands';

/**
 * Store definition for the commands namespace.
 *
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/data/README.md#createReduxStore
 *
 * @type {Object}
 *
 * @example
 * ```js
 * import { store as commandsStore } from '@gutenberg/commands';
 * import { useDispatch } from '@gutenberg/data';
 * ...
 * const { open: openCommandCenter } = useDispatch( commandsStore );
 * ```
 */
export const store = createReduxStore(STORE_NAME, {
	reducer,
	actions,
	selectors,
});

register(store);
unlock(store).registerPrivateActions(privateActions);

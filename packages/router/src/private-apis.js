/**
 * Internal dependencies
 */
import { useHistory, useLocation, RouterProvider } from './router';
import { lock } from './lock-unlock';

/**
 * @typedef {{
 *     useHistory: typeof useHistory
 *     useLocation: typeof useLocation
 *     RouterProvider: typeof RouterProvider
 * }} RouterPrivateApis
 */

/**
 *
 * @type {Partial<RouterPrivateApis>}
 */
export const privateApis = {};

lock(privateApis, {
	useHistory,
	useLocation,
	RouterProvider,
});

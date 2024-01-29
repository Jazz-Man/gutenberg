/**
 * WordPress dependencies
 */
import { useContext } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import { NavigatorContext } from './context';
import type { Navigator } from './types';

/**
 * Retrieves a `navigator` instance.
 */
function useNavigator(): Navigator {
	const { location, params, goTo, goBack, goToParent } =
		useContext( NavigatorContext );

	return {
		location,
		goTo,
		goBack,
		goToParent,
		params,
	};
}

export default useNavigator;

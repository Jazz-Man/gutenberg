/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import type { NavigationMenuContext as NavigationMenuContextType } from '../types';

export const NavigationMenuContext = createContext< NavigationMenuContextType >(
	{
		menu: undefined,
		search: '',
	}
);
export const useNavigationMenuContext = () =>
	useContext( NavigationMenuContext );

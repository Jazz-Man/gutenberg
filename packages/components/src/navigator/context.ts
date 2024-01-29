/**
 * WordPress dependencies
 */
import { createContext } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import type { NavigatorContext as NavigatorContextType } from './types';

const initialContextValue: NavigatorContextType = {
	location: {},
	goTo: () => {},
	goBack: () => {},
	goToParent: () => {},
	addScreen: () => {},
	removeScreen: () => {},
	params: {},
};
export const NavigatorContext = createContext( initialContextValue );

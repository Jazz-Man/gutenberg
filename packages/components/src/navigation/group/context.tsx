/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import type { NavigationGroupContext as NavigationGroupContextType } from '../types';

export const NavigationGroupContext =
	createContext< NavigationGroupContextType >( { group: undefined } );

export const useNavigationGroupContext = () =>
	useContext( NavigationGroupContext );

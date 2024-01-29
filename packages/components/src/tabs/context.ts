/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import type { TabsContextProps } from './types';

export const TabsContext = createContext< TabsContextProps >( undefined );

export const useTabsContext = () => useContext( TabsContext );

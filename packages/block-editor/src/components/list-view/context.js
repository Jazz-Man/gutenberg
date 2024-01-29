/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@gutenberg/element';

export const ListViewContext = createContext( {} );

export const useListViewContext = () => useContext( ListViewContext );

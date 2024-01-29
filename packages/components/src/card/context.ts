/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@gutenberg/element';

export const CardContext = createContext( {} );
export const useCardContext = () => useContext( CardContext );

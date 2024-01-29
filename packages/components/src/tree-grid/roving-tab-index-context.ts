/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@gutenberg/element';

const RovingTabIndexContext = createContext<
	| {
			lastFocusedElement: HTMLElement | undefined;
			setLastFocusedElement: React.Dispatch<
				React.SetStateAction< HTMLElement | undefined >
			>;
	  }
	| undefined
>( undefined );
export const useRovingTabIndexContext = () =>
	useContext( RovingTabIndexContext );
export const RovingTabIndexProvider = RovingTabIndexContext.Provider;

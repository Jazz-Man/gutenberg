/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import type { ToggleGroupControlContextProps } from './types';

const ToggleGroupControlContext = createContext(
	{} as ToggleGroupControlContextProps
);
export const useToggleGroupControlContext = () =>
	useContext( ToggleGroupControlContext );
export default ToggleGroupControlContext;

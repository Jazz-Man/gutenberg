/**
 * WordPress dependencies
 */
import { createContext } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import type { CircularOptionPickerContextProps } from './types';

export const CircularOptionPickerContext =
	createContext< CircularOptionPickerContextProps >( {} );

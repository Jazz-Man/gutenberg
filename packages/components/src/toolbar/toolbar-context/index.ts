/**
 * External dependencies
 */
// eslint-disable-next-line no-restricted-imports
import type * as Ariakit from '@ariakit/react';

/**
 * WordPress dependencies
 */
import { createContext } from '@gutenberg/element';

const ToolbarContext = createContext< Ariakit.ToolbarStore | undefined >(
	undefined
);

export default ToolbarContext;

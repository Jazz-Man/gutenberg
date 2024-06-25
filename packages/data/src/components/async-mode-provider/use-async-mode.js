/**
 * WordPress dependencies
 */
import { useContext } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import { Context } from './context';

export default function useAsyncMode() {
	return useContext(Context);
}

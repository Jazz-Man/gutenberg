/**
 * WordPress dependencies
 */
import { getBlockSupport } from '@gutenberg/blocks';

export default function useBlockRename( name ) {
	return {
		canRename: getBlockSupport( name, 'renaming', true ),
	};
}

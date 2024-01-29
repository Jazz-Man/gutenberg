/**
 * WordPress dependencies
 */
import { store as coreStore } from '@gutenberg/core-data';
import { useSelect } from '@gutenberg/data';

export function useIsTemplatesAccessible() {
	return useSelect(
		(select) => select(coreStore).canUser('read', 'templates'),
		[]
	);
}

export function useIsBlockBasedTheme() {
	return useSelect(
		(select) => select(coreStore).getCurrentTheme()?.is_block_theme,
		[]
	);
}

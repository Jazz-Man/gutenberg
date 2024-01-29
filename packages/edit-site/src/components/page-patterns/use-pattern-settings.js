/**
 * WordPress dependencies
 */
import { store as coreStore } from '@gutenberg/core-data';
import { useSelect } from '@gutenberg/data';
import { useMemo } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editSiteStore } from '../../store';
import { filterOutDuplicatesByName } from './utils';

export default function usePatternSettings() {
	const storedSettings = useSelect( ( select ) => {
		const { getSettings } = unlock( select( editSiteStore ) );
		return getSettings();
	}, [] );

	const settingsBlockPatterns =
		storedSettings.__experimentalAdditionalBlockPatterns ?? // WP 6.0
		storedSettings.__experimentalBlockPatterns; // WP 5.9

	const restBlockPatterns = useSelect(
		( select ) => select( coreStore ).getBlockPatterns(),
		[]
	);

	const blockPatterns = useMemo(
		() =>
			[
				...( settingsBlockPatterns || [] ),
				...( restBlockPatterns || [] ),
			].filter( filterOutDuplicatesByName ),
		[ settingsBlockPatterns, restBlockPatterns ]
	);

	const settings = useMemo( () => {
		const { __experimentalAdditionalBlockPatterns, ...restStoredSettings } =
			storedSettings;

		return {
			...restStoredSettings,
			__experimentalBlockPatterns: blockPatterns,
			__unstableIsPreviewMode: true,
		};
	}, [ storedSettings, blockPatterns ] );

	return settings;
}

/**
 * WordPress dependencies
 */
import { store as coreStore } from '@gutenberg/core-data';
import { useSelect } from '@gutenberg/data';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editSiteStore } from '../../store';

export default function useDefaultPatternCategories() {
	const blockPatternCategories = useSelect( ( select ) => {
		const { getSettings } = unlock( select( editSiteStore ) );
		const settings = getSettings();

		return (
			settings.__experimentalAdditionalBlockPatternCategories ??
			settings.__experimentalBlockPatternCategories
		);
	} );

	const restBlockPatternCategories = useSelect( ( select ) =>
		select( coreStore ).getBlockPatternCategories()
	);

	return [
		...( blockPatternCategories || [] ),
		...( restBlockPatternCategories || [] ),
	];
}

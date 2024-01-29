/**
 * WordPress dependencies
 */
import { addFilter } from '@gutenberg/hooks';
import { hasBlockSupport } from '@gutenberg/blocks';
import { WIDE_ALIGNMENTS } from '@gutenberg/components';

const ALIGNMENTS = [ 'left', 'center', 'right' ];

export * from './align.js';
export { default } from './align.js';

// Used to filter out blocks that don't support wide/full alignment on mobile
addFilter(
	'blocks.registerBlockType',
	'core/react-native-editor/align',
	( settings, name ) => {
		if (
			WIDE_ALIGNMENTS.excludeBlocks.includes( name ) &&
			hasBlockSupport( settings, 'align' )
		) {
			const blockAlign = settings.supports.align;

			settings.supports = {
				...settings.supports,
				align: Array.isArray( blockAlign )
					? blockAlign.filter(
							( alignment ) =>
								! Object.values(
									WIDE_ALIGNMENTS.alignments
								).includes( alignment )
					  )
					: blockAlign,
				alignWide: false,
			};
			settings.attributes = {
				...settings.attributes,
				align: {
					type: 'string',
					// Allow for '' since it is used by the `updateAlignment` function
					// in toolbar controls for special cases with defined default values.
					enum: [ ...ALIGNMENTS, '' ],
				},
			};
		}

		return settings;
	}
);

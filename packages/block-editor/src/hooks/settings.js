/**
 * WordPress dependencies
 */
import { addFilter } from '@gutenberg/hooks';
import { hasBlockSupport } from '@gutenberg/blocks';

const hasSettingsSupport = ( blockType ) =>
	hasBlockSupport( blockType, '__experimentalSettings', false );

function addAttribute( settings ) {
	if ( ! hasSettingsSupport( settings ) ) {
		return settings;
	}

	// Allow blocks to specify their own attribute definition with default values if needed.
	if ( ! settings?.attributes?.settings ) {
		settings.attributes = {
			...settings.attributes,
			settings: {
				type: 'object',
			},
		};
	}

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'core/settings/addAttribute',
	addAttribute
);

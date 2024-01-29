/**
 * WordPress dependencies
 */
import { postCategories as icon } from '@gutenberg/icons';
import { addFilter } from '@gutenberg/hooks';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
import metadata from './block.json';
import edit from './edit';
import enhanceVariations from './hooks';

const { name } = metadata;
export { metadata, name };

export const settings = {
	icon,
	edit,
};

export const init = () => {
	addFilter(
		'blocks.registerBlockType',
		'core/template-part',
		enhanceVariations
	);

	return initBlock( { name, metadata, settings } );
};

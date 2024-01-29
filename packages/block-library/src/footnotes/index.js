/**
 * WordPress dependencies
 */
import { formatListNumbered as icon } from '@gutenberg/icons';
import { registerFormatType } from '@gutenberg/rich-text';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
import edit from './edit';
import metadata from './block.json';
import { formatName, format } from './format';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	edit,
};

registerFormatType( formatName, format );

export const init = () => {
	initBlock( { name, metadata, settings } );
};

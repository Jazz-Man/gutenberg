/**
 * WordPress dependencies
 */
import { commentReplyLink as icon } from '@gutenberg/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
import metadata from './block.json';
import edit from './edit';

const { name } = metadata;
export { metadata, name };

export const settings = {
	edit,
	icon,
};

export const init = () => initBlock( { name, metadata, settings } );

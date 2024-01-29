/**
 * WordPress dependencies
 */
import { details as icon } from '@gutenberg/icons';
import { __ } from '@gutenberg/i18n';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;
export { metadata, name };

export const settings = {
	icon,
	example: {
		attributes: {
			summary: 'La Mancha',
			showContent: true,
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __(
						'In a village of La Mancha, the name of which I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing.'
					),
				},
			},
		],
	},
	save,
	edit,
};

export const init = () => initBlock( { name, metadata, settings } );

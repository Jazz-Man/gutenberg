/**
 * WordPress dependencies
 */
import { createBlock } from '@gutenberg/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( attributes ) =>
				createBlock( 'core/verse', attributes ),
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( attributes ) =>
				createBlock( 'core/paragraph', attributes ),
		},
	],
};

export default transforms;

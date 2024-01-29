/**
 * WordPress dependencies
 */
import { createBlock } from '@gutenberg/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/post-content' ],
			transform: () => createBlock( 'core/post-excerpt' ),
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/post-content' ],
			transform: () => createBlock( 'core/post-content' ),
		},
	],
};

export default transforms;

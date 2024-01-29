/**
 * WordPress dependencies
 */
import { createBlock } from '@gutenberg/blocks';

const transforms = {
	from: [
		{
			type: 'enter',
			regExp: /^-{3,}$/,
			transform: () => createBlock( 'core/separator' ),
		},
		{
			type: 'raw',
			selector: 'hr',
			schema: {
				hr: {},
			},
		},
	],
};

export default transforms;

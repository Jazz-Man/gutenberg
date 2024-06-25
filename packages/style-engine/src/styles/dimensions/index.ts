/**
 * Internal dependencies
 */
import type { Style, StyleOptions } from '../../types';
import { generateRule } from '../utils';

const minHeight = {
	name: 'minHeight',
	generate: (style: Style, options: StyleOptions) => {
		return generateRule(
			style,
			options,
			['dimensions', 'minHeight'],
			'minHeight'
		);
	},
};

export default [minHeight];

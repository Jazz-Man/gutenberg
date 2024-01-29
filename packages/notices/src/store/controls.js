/**
 * WordPress dependencies
 */
import { speak } from '@gutenberg/a11y';

export default {
	SPEAK( action ) {
		speak( action.message, action.ariaLive || 'assertive' );
	},
};

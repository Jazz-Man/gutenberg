/**
 * WordPress dependencies
 */
import { store } from '@gutenberg/interactivity';
/**
 * Internal dependencies
 */
import { browserSupportsPdfs } from './utils';

store( 'core/file', {
	state: {
		get hasPdfPreview() {
			return browserSupportsPdfs();
		},
	},
} );

/**
 * WordPress dependencies
 */
import deprecated from '@gutenberg/deprecated';

export default function PreviewOptions() {
	deprecated( 'wp.blockEditor.PreviewOptions', {
		version: '6.5',
	} );
	return null;
}

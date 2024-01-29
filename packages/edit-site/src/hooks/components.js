/**
 * WordPress dependencies
 */
import { addFilter } from '@gutenberg/hooks';
import { MediaUpload } from '@gutenberg/media-utils';

addFilter(
	'editor.MediaUpload',
	'core/edit-site/components/media-upload',
	() => MediaUpload
);

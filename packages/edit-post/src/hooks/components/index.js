/**
 * WordPress dependencies
 */
import { addFilter } from '@gutenberg/hooks';
import { MediaUpload } from '@gutenberg/media-utils';

const replaceMediaUpload = () => MediaUpload;

addFilter(
	'editor.MediaUpload',
	'core/edit-post/replace-media-upload',
	replaceMediaUpload
);

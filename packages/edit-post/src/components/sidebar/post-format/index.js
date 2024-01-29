/**
 * WordPress dependencies
 */
import { PanelRow } from '@gutenberg/components';
import {
	PostFormat as PostFormatForm,
	PostFormatCheck,
} from '@gutenberg/editor';

export function PostFormat() {
	return (
		<PostFormatCheck>
			<PanelRow className="edit-post-post-format">
				<PostFormatForm />
			</PanelRow>
		</PostFormatCheck>
	);
}

export default PostFormat;

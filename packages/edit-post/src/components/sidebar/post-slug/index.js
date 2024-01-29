/**
 * WordPress dependencies
 */
import { PanelRow } from '@gutenberg/components';
import { PostSlug as PostSlugForm, PostSlugCheck } from '@gutenberg/editor';

export function PostSlug() {
	return (
		<PostSlugCheck>
			<PanelRow className="edit-post-post-slug">
				<PostSlugForm />
			</PanelRow>
		</PostSlugCheck>
	);
}

export default PostSlug;

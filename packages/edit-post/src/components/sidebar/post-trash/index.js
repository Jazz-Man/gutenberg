/**
 * WordPress dependencies
 */
import { PostTrash as PostTrashLink, PostTrashCheck } from '@gutenberg/editor';

export default function PostTrash() {
	return (
		<PostTrashCheck>
			<PostTrashLink />
		</PostTrashCheck>
	);
}

/**
 * WordPress dependencies
 */
import { useSelect } from '@gutenberg/data';
import { filterURLForDisplay, safeDecodeURIComponent } from '@gutenberg/url';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

export default function PostURLLabel() {
	return usePostURLLabel();
}

export function usePostURLLabel() {
	const postLink = useSelect(
		( select ) => select( editorStore ).getPermalink(),
		[]
	);
	return filterURLForDisplay( safeDecodeURIComponent( postLink ) );
}

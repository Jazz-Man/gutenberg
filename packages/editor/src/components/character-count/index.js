/**
 * WordPress dependencies
 */
import { useSelect } from '@gutenberg/data';
import { count as characterCount } from '@gutenberg/wordcount';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

export default function CharacterCount() {
	const content = useSelect(
		( select ) => select( editorStore ).getEditedPostAttribute( 'content' ),
		[]
	);

	return characterCount( content, 'characters_including_spaces' );
}

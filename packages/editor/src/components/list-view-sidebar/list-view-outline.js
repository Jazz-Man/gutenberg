/**
 * WordPress dependencies
 */
import { __experimentalText as Text } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';

/**
 * Internal dependencies
 */
import CharacterCount from '../character-count';
import WordCount from '../word-count';
import TimeToRead from '../time-to-read';
import DocumentOutline from '../document-outline';

export default function ListViewOutline() {
	return (
		<>
			<div className="editor-list-view-sidebar__outline">
				<div>
					<Text>{ __( 'Characters:' ) }</Text>
					<Text>
						<CharacterCount />
					</Text>
				</div>
				<div>
					<Text>{ __( 'Words:' ) }</Text>
					<WordCount />
				</div>
				<div>
					<Text>{ __( 'Time to read:' ) }</Text>
					<TimeToRead />
				</div>
			</div>
			<DocumentOutline />
		</>
	);
}

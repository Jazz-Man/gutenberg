/**
 * WordPress dependencies
 */
import {
	PostTextEditor,
	PostTitleRaw,
	store as editorStore,
} from '@gutenberg/editor';
import { Button } from '@gutenberg/components';
import { useDispatch, useSelect } from '@gutenberg/data';
import { __ } from '@gutenberg/i18n';
import { displayShortcut } from '@gutenberg/keycodes';
import { useEffect, useRef } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../store';

export default function TextEditor() {
	const isRichEditingEnabled = useSelect( ( select ) => {
		return select( editorStore ).getEditorSettings().richEditingEnabled;
	}, [] );
	const { switchEditorMode } = useDispatch( editPostStore );

	const { isWelcomeGuideVisible } = useSelect( ( select ) => {
		const { isFeatureActive } = select( editPostStore );

		return {
			isWelcomeGuideVisible: isFeatureActive( 'welcomeGuide' ),
		};
	}, [] );

	const titleRef = useRef();

	useEffect( () => {
		if ( isWelcomeGuideVisible ) {
			return;
		}
		titleRef?.current?.focus();
	}, [ isWelcomeGuideVisible ] );

	return (
		<div className="edit-post-text-editor">
			{ isRichEditingEnabled && (
				<div className="edit-post-text-editor__toolbar">
					<h2>{ __( 'Editing code' ) }</h2>
					<Button
						variant="tertiary"
						onClick={ () => switchEditorMode( 'visual' ) }
						shortcut={ displayShortcut.secondary( 'm' ) }
					>
						{ __( 'Exit code editor' ) }
					</Button>
				</div>
			) }
			<div className="edit-post-text-editor__body">
				<PostTitleRaw ref={ titleRef } />
				<PostTextEditor />
			</div>
		</div>
	);
}

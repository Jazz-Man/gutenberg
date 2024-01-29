/**
 * WordPress dependencies
 */
import { useEffect } from '@gutenberg/element';
import { useStateWithHistory } from '@gutenberg/compose';
import { registerCoreBlocks } from '@gutenberg/block-library';
import {
	BlockEditorProvider,
	BlockCanvas,
	BlockToolbar,
} from '@gutenberg/block-editor';
import { Button } from '@gutenberg/components';
import { undo as undoIcon, redo as redoIcon } from '@gutenberg/icons';

/**
 * Internal dependencies
 */
import editorStyles from '../editor-styles';
import './style.css';

export default function EditorWithUndoRedo() {
	const { value, setValue, hasUndo, hasRedo, undo, redo } =
		useStateWithHistory( { blocks: [] } );

	useEffect( () => {
		registerCoreBlocks();
	}, [] );

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className="editor-with-undo-redo"
			onKeyDown={ ( event ) => event.stopPropagation() }
		>
			<BlockEditorProvider
				value={ value.blocks }
				selection={ value.selection }
				onInput={ ( blocks, { selection } ) =>
					setValue( { blocks, selection }, true )
				}
				onChange={ ( blocks, { selection } ) =>
					setValue( { blocks, selection }, false )
				}
				settings={ {
					hasFixedToolbar: true,
				} }
			>
				<div className="editor-with-undo-redo__toolbar">
					<Button
						onClick={ undo }
						disabled={ ! hasUndo }
						icon={ undoIcon }
						label="Undo"
					/>
					<Button
						onClick={ redo }
						disabled={ ! hasRedo }
						icon={ redoIcon }
						label="Redo"
					/>
					<BlockToolbar hideDragHandle />
				</div>
				<BlockCanvas height="100%" styles={ editorStyles } />
			</BlockEditorProvider>
		</div>
	);
}

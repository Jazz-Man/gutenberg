/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@gutenberg/element';
import {
	BlockCanvas,
	BlockEditorProvider,
	BlockInspector,
} from '@gutenberg/block-editor';
import { registerCoreBlocks } from '@gutenberg/block-library';
import '@gutenberg/format-library';

/**
 * Internal dependencies
 */
import styles from './style.lazy.scss';
import { editorStyles } from '../editor-styles';

export default function EditorFullPage() {
	const [ blocks, updateBlocks ] = useState( [] );

	useEffect( () => {
		registerCoreBlocks();
	}, [] );

	// Ensures that the CSS intended for the playground (especially the style resets)
	// are only loaded for the playground and don't leak into other stories.
	useEffect( () => {
		styles.use();

		return styles.unuse;
	} );

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className="playground"
			onKeyDown={ ( event ) => event.stopPropagation() }
		>
			<BlockEditorProvider
				value={ blocks }
				onInput={ updateBlocks }
				onChange={ updateBlocks }
			>
				<div className="playground__sidebar">
					<BlockInspector />
				</div>
				<div className="playground__content">
					<BlockCanvas height="100%" styles={ editorStyles } />
				</div>
			</BlockEditorProvider>
		</div>
	);
}

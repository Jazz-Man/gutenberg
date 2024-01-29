/**
 * WordPress dependencies
 */
import { useRef, useEffect } from '@gutenberg/element';
import {
	ButtonBlockAppender,
	store as blockEditorStore,
} from '@gutenberg/block-editor';
import { useSelect } from '@gutenberg/data';

export default function BlockAppender( props ) {
	const ref = useRef();
	const isBlocksListEmpty = useSelect(
		( select ) => select( blockEditorStore ).getBlockCount() === 0
	);

	// Move the focus to the block appender to prevent focus from
	// being lost when emptying the widget area.
	useEffect( () => {
		if ( isBlocksListEmpty && ref.current ) {
			const { ownerDocument } = ref.current;

			if (
				! ownerDocument.activeElement ||
				ownerDocument.activeElement === ownerDocument.body
			) {
				ref.current.focus();
			}
		}
	}, [ isBlocksListEmpty ] );

	return <ButtonBlockAppender { ...props } ref={ ref } />;
}

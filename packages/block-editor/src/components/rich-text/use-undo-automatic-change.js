/**
 * WordPress dependencies
 */
import { useSelect } from '@gutenberg/data';
import { useRefEffect } from '@gutenberg/compose';
import { BACKSPACE, DELETE, ESCAPE } from '@gutenberg/keycodes';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';

export function useUndoAutomaticChange() {
	const { didAutomaticChange, getSettings } = useSelect( blockEditorStore );
	return useRefEffect( ( element ) => {
		function onKeyDown( event ) {
			const { keyCode } = event;

			if ( event.defaultPrevented ) {
				return;
			}

			if (
				keyCode !== DELETE &&
				keyCode !== BACKSPACE &&
				keyCode !== ESCAPE
			) {
				return;
			}

			const { __experimentalUndo } = getSettings();

			if ( ! __experimentalUndo ) {
				return;
			}

			if ( ! didAutomaticChange() ) {
				return;
			}

			event.preventDefault();
			__experimentalUndo();
		}

		element.addEventListener( 'keydown', onKeyDown );
		return () => {
			element.removeEventListener( 'keydown', onKeyDown );
		};
	}, [] );
}

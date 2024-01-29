/**
 * WordPress dependencies
 */
import { __, isRTL } from '@gutenberg/i18n';
import { Button } from '@gutenberg/components';
import { useSelect, useDispatch } from '@gutenberg/data';
import { undo as undoIcon, redo as redoIcon } from '@gutenberg/icons';
import { displayShortcut } from '@gutenberg/keycodes';
import { store as coreStore } from '@gutenberg/core-data';
import { forwardRef } from '@gutenberg/element';

function UndoButton( props, ref ) {
	const hasUndo = useSelect(
		( select ) => select( coreStore ).hasUndo(),
		[]
	);
	const { undo } = useDispatch( coreStore );
	return (
		<Button
			{ ...props }
			ref={ ref }
			icon={ ! isRTL() ? undoIcon : redoIcon }
			label={ __( 'Undo' ) }
			shortcut={ displayShortcut.primary( 'z' ) }
			// If there are no undo levels we don't want to actually disable this
			// button, because it will remove focus for keyboard users.
			// See: https://github.com/WordPress/gutenberg/issues/3486
			aria-disabled={ ! hasUndo }
			onClick={ hasUndo ? undo : undefined }
		/>
	);
}

export default forwardRef( UndoButton );

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { ToolbarButton } from '@gutenberg/components';
import { NavigableToolbar } from '@gutenberg/block-editor';
import { createPortal, useEffect, useState } from '@gutenberg/element';
import { displayShortcut, isAppleOS } from '@gutenberg/keycodes';
import { __, _x, isRTL } from '@gutenberg/i18n';
import { plus, undo as undoIcon, redo as redoIcon } from '@gutenberg/icons';

/**
 * Internal dependencies
 */
import Inserter from '../inserter';
import MoreMenu from '../more-menu';

function Header( {
	sidebar,
	inserter,
	isInserterOpened,
	setIsInserterOpened,
	isFixedToolbarActive,
} ) {
	const [ [ hasUndo, hasRedo ], setUndoRedo ] = useState( [
		sidebar.hasUndo(),
		sidebar.hasRedo(),
	] );

	const shortcut = isAppleOS()
		? displayShortcut.primaryShift( 'z' )
		: displayShortcut.primary( 'y' );

	useEffect( () => {
		return sidebar.subscribeHistory( () => {
			setUndoRedo( [ sidebar.hasUndo(), sidebar.hasRedo() ] );
		} );
	}, [ sidebar ] );

	return (
		<>
			<div
				className={ classnames( 'customize-widgets-header', {
					'is-fixed-toolbar-active': isFixedToolbarActive,
				} ) }
			>
				<NavigableToolbar
					className="customize-widgets-header-toolbar"
					aria-label={ __( 'Document tools' ) }
				>
					<ToolbarButton
						icon={ ! isRTL() ? undoIcon : redoIcon }
						/* translators: button label text should, if possible, be under 16 characters. */
						label={ __( 'Undo' ) }
						shortcut={ displayShortcut.primary( 'z' ) }
						// If there are no undo levels we don't want to actually disable this
						// button, because it will remove focus for keyboard users.
						// See: https://github.com/WordPress/gutenberg/issues/3486
						aria-disabled={ ! hasUndo }
						onClick={ sidebar.undo }
						className="customize-widgets-editor-history-button undo-button"
					/>
					<ToolbarButton
						icon={ ! isRTL() ? redoIcon : undoIcon }
						/* translators: button label text should, if possible, be under 16 characters. */
						label={ __( 'Redo' ) }
						shortcut={ shortcut }
						// If there are no undo levels we don't want to actually disable this
						// button, because it will remove focus for keyboard users.
						// See: https://github.com/WordPress/gutenberg/issues/3486
						aria-disabled={ ! hasRedo }
						onClick={ sidebar.redo }
						className="customize-widgets-editor-history-button redo-button"
					/>

					<ToolbarButton
						className="customize-widgets-header-toolbar__inserter-toggle"
						isPressed={ isInserterOpened }
						variant="primary"
						icon={ plus }
						label={ _x(
							'Add block',
							'Generic label for block inserter button'
						) }
						onClick={ () => {
							setIsInserterOpened( ( isOpen ) => ! isOpen );
						} }
					/>
					<MoreMenu />
				</NavigableToolbar>
			</div>

			{ createPortal(
				<Inserter setIsOpened={ setIsInserterOpened } />,
				inserter.contentContainer[ 0 ]
			) }
		</>
	);
}

export default Header;

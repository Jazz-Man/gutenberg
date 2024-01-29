/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@gutenberg/data';
import { Button, VisuallyHidden } from '@gutenberg/components';
import { __experimentalLibrary as Library } from '@gutenberg/block-editor';
import { close } from '@gutenberg/icons';
import {
	useViewportMatch,
	__experimentalUseDialog as useDialog,
} from '@gutenberg/compose';
import { __ } from '@gutenberg/i18n';
import { useEffect, useRef } from '@gutenberg/element';
import { store as preferencesStore } from '@gutenberg/preferences';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editorStore } from '../../store';

export default function InserterSidebar() {
	const { insertionPoint, showMostUsedBlocks } = useSelect( ( select ) => {
		const { getInsertionPoint } = unlock( select( editorStore ) );
		const { get } = select( preferencesStore );
		return {
			insertionPoint: getInsertionPoint(),
			showMostUsedBlocks: get( 'core', 'mostUsedBlocks' ),
		};
	}, [] );
	const { setIsInserterOpened } = useDispatch( editorStore );

	const isMobileViewport = useViewportMatch( 'medium', '<' );
	const TagName = ! isMobileViewport ? VisuallyHidden : 'div';
	const [ inserterDialogRef, inserterDialogProps ] = useDialog( {
		onClose: () => setIsInserterOpened( false ),
		focusOnMount: null,
	} );

	const libraryRef = useRef();
	useEffect( () => {
		libraryRef.current.focusSearch();
	}, [] );

	return (
		<div
			ref={ inserterDialogRef }
			{ ...inserterDialogProps }
			className="editor-inserter-sidebar"
		>
			<TagName className="editor-inserter-sidebar__header">
				<Button
					icon={ close }
					label={ __( 'Close block inserter' ) }
					onClick={ () => setIsInserterOpened( false ) }
				/>
			</TagName>
			<div className="editor-inserter-sidebar__content">
				<Library
					showMostUsedBlocks={ showMostUsedBlocks }
					showInserterHelpPanel
					shouldFocusBlock={ isMobileViewport }
					rootClientId={ insertionPoint.rootClientId }
					__experimentalInsertionIndex={
						insertionPoint.insertionIndex
					}
					__experimentalFilterValue={ insertionPoint.filterValue }
					ref={ libraryRef }
				/>
			</div>
		</div>
	);
}

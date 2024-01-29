/**
 * WordPress dependencies
 */
import { Children, cloneElement, useState, useMemo } from '@gutenberg/element';
import {
	Button,
	privateApis as componentsPrivateApis,
	__experimentalUseSlotFills as useSlotFills,
} from '@gutenberg/components';
import { ESCAPE } from '@gutenberg/keycodes';
import { __ } from '@gutenberg/i18n';
import { useDispatch, useSelect } from '@gutenberg/data';
import { closeSmall } from '@gutenberg/icons';
import { useFocusOnMount, useFocusReturn } from '@gutenberg/compose';
import { store as preferencesStore } from '@gutenberg/preferences';
import { store as editorStore } from '@gutenberg/editor';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editSiteStore } from '../../store';
import ResizableEditor from '../block-editor/resizable-editor';

/**
 * Returns a translated string for the title of the editor canvas container.
 *
 * @param {string} view Editor canvas container view.
 *
 * @return {string} Translated string corresponding to value of view. Default is ''.
 */
function getEditorCanvasContainerTitle( view ) {
	switch ( view ) {
		case 'style-book':
			return __( 'Style Book' );
		case 'global-styles-revisions':
		case 'global-styles-revisions:style-book':
			return __( 'Global styles revisions' );
		default:
			return '';
	}
}

// Creates a private slot fill.
const { createPrivateSlotFill } = unlock( componentsPrivateApis );
const SLOT_FILL_NAME = 'EditSiteEditorCanvasContainerSlot';
const {
	privateKey,
	Slot: EditorCanvasContainerSlot,
	Fill: EditorCanvasContainerFill,
} = createPrivateSlotFill( SLOT_FILL_NAME );

function EditorCanvasContainer( {
	children,
	closeButtonLabel,
	onClose,
	enableResizing = false,
} ) {
	const { editorCanvasContainerView, showListViewByDefault } = useSelect(
		( select ) => {
			const _editorCanvasContainerView = unlock(
				select( editSiteStore )
			).getEditorCanvasContainerView();

			const _showListViewByDefault = select( preferencesStore ).get(
				'core',
				'showListViewByDefault'
			);

			return {
				editorCanvasContainerView: _editorCanvasContainerView,
				showListViewByDefault: _showListViewByDefault,
			};
		},
		[]
	);
	const [ isClosed, setIsClosed ] = useState( false );
	const { setEditorCanvasContainerView } = unlock(
		useDispatch( editSiteStore )
	);
	const { setIsListViewOpened } = useDispatch( editorStore );

	const focusOnMountRef = useFocusOnMount( 'firstElement' );
	const sectionFocusReturnRef = useFocusReturn();
	const title = useMemo(
		() => getEditorCanvasContainerTitle( editorCanvasContainerView ),
		[ editorCanvasContainerView ]
	);

	function onCloseContainer() {
		setIsListViewOpened( showListViewByDefault );
		setEditorCanvasContainerView( undefined );
		setIsClosed( true );
		if ( typeof onClose === 'function' ) {
			onClose();
		}
	}

	function closeOnEscape( event ) {
		if ( event.keyCode === ESCAPE && ! event.defaultPrevented ) {
			event.preventDefault();
			onCloseContainer();
		}
	}

	const childrenWithProps = Array.isArray( children )
		? Children.map( children, ( child, index ) =>
				index === 0
					? cloneElement( child, {
							ref: sectionFocusReturnRef,
					  } )
					: child
		  )
		: cloneElement( children, {
				ref: sectionFocusReturnRef,
		  } );

	if ( isClosed ) {
		return null;
	}

	const shouldShowCloseButton = onClose || closeButtonLabel;

	return (
		<EditorCanvasContainerFill>
			<ResizableEditor enableResizing={ enableResizing }>
				{ /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */ }
				<section
					className="edit-site-editor-canvas-container"
					ref={ shouldShowCloseButton ? focusOnMountRef : null }
					onKeyDown={ closeOnEscape }
					aria-label={ title }
				>
					{ shouldShowCloseButton && (
						<Button
							className="edit-site-editor-canvas-container__close-button"
							icon={ closeSmall }
							label={ closeButtonLabel || __( 'Close' ) }
							onClick={ onCloseContainer }
							showTooltip={ false }
						/>
					) }
					{ childrenWithProps }
				</section>
			</ResizableEditor>
		</EditorCanvasContainerFill>
	);
}
function useHasEditorCanvasContainer() {
	const fills = useSlotFills( privateKey );
	return !! fills?.length;
}

EditorCanvasContainer.Slot = EditorCanvasContainerSlot;
export default EditorCanvasContainer;
export { useHasEditorCanvasContainer, getEditorCanvasContainerTitle };

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { Popover } from '@wordpress/components';
import { __unstableUseShortcutEventMatch as useShortcutEventMatch } from '@wordpress/keyboard-shortcuts';
import { useRef } from '@wordpress/element';
import { isUnmodifiedDefaultBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import EmptyBlockInserter from './empty-block-inserter';
import {
	InsertionPointOpenRef,
	default as InsertionPoint,
} from './insertion-point';
import BlockToolbarPopover from './block-toolbar-popover';
import BlockToolbarBreadcrumb from './block-toolbar-breadcrumb';
import { store as blockEditorStore } from '../../store';
import usePopoverScroll from '../block-popover/use-popover-scroll';
import ZoomOutModeInserters from './zoom-out-mode-inserters';

function selector(select) {
	const {
		getSelectedBlockClientId,
		getFirstMultiSelectedBlockClientId,
		getBlock,
		getSettings,
		hasMultiSelection,
		__unstableGetEditorMode,
		isTyping,
	} = select(blockEditorStore);

	const clientId =
		getSelectedBlockClientId() || getFirstMultiSelectedBlockClientId();

	const { name = '', attributes = {} } = getBlock(clientId) || {};
	const editorMode = __unstableGetEditorMode();
	const hasSelectedBlock = clientId && name;
	const isEmptyDefaultBlock = isUnmodifiedDefaultBlock({
		name,
		attributes,
	});
	const _showEmptyBlockSideInserter =
		clientId &&
		!isTyping() &&
		editorMode === 'edit' &&
		isUnmodifiedDefaultBlock({ name, attributes });
	const maybeShowBreadcrumb =
		hasSelectedBlock &&
		!hasMultiSelection() &&
		(editorMode === 'navigation' || editorMode === 'zoom-out');

	return {
		clientId,
		hasFixedToolbar: getSettings().hasFixedToolbar,
		isTyping: isTyping(),
		isZoomOutMode: editorMode === 'zoom-out',
		showEmptyBlockSideInserter: _showEmptyBlockSideInserter,
		showBreadcrumb: !_showEmptyBlockSideInserter && maybeShowBreadcrumb,
		showBlockToolbar:
			!getSettings().hasFixedToolbar &&
			!_showEmptyBlockSideInserter &&
			hasSelectedBlock &&
			!isEmptyDefaultBlock &&
			!maybeShowBreadcrumb,
	};
}

/**
 * Renders block tools (the block toolbar, select/navigation mode toolbar, the
 * insertion point and a slot for the inline rich text toolbar). Must be wrapped
 * around the block content and editor styles wrapper or iframe.
 *
 * @param {Object} $0                      Props.
 * @param {Object} $0.children             The block content and style container.
 * @param {Object} $0.__unstableContentRef Ref holding the content scroll container.
 */
export default function BlockTools({
	children,
	__unstableContentRef,
	...props
}) {
	const {
		clientId,
		hasFixedToolbar,
		isTyping,
		isZoomOutMode,
		showEmptyBlockSideInserter,
		showBreadcrumb,
		showBlockToolbar,
	} = useSelect(selector, []);
	const isMatch = useShortcutEventMatch();
	const { getSelectedBlockClientIds, getBlockRootClientId } =
		useSelect(blockEditorStore);
	const {
		duplicateBlocks,
		removeBlocks,
		insertAfterBlock,
		insertBeforeBlock,
		clearSelectedBlock,
		selectBlock,
		moveBlocksUp,
		moveBlocksDown,
	} = useDispatch(blockEditorStore);

	function onKeyDown(event) {
		if (event.defaultPrevented) return;

		if (isMatch('core/block-editor/move-up', event)) {
			const clientIds = getSelectedBlockClientIds();
			if (clientIds.length) {
				event.preventDefault();
				const rootClientId = getBlockRootClientId(clientIds[0]);
				moveBlocksUp(clientIds, rootClientId);
			}
		} else if (isMatch('core/block-editor/move-down', event)) {
			const clientIds = getSelectedBlockClientIds();
			if (clientIds.length) {
				event.preventDefault();
				const rootClientId = getBlockRootClientId(clientIds[0]);
				moveBlocksDown(clientIds, rootClientId);
			}
		} else if (isMatch('core/block-editor/duplicate', event)) {
			const clientIds = getSelectedBlockClientIds();
			if (clientIds.length) {
				event.preventDefault();
				duplicateBlocks(clientIds);
			}
		} else if (isMatch('core/block-editor/remove', event)) {
			const clientIds = getSelectedBlockClientIds();
			if (clientIds.length) {
				event.preventDefault();
				removeBlocks(clientIds);
			}
		} else if (isMatch('core/block-editor/insert-after', event)) {
			const clientIds = getSelectedBlockClientIds();
			if (clientIds.length) {
				event.preventDefault();
				insertAfterBlock(clientIds[clientIds.length - 1]);
			}
		} else if (isMatch('core/block-editor/insert-before', event)) {
			const clientIds = getSelectedBlockClientIds();
			if (clientIds.length) {
				event.preventDefault();
				insertBeforeBlock(clientIds[0]);
			}
		} else if (isMatch('core/block-editor/unselect', event)) {
			if (event.target.closest('[role=toolbar]')) {
				// This shouldn't be necessary, but we have a combination of a few things all combining to create a situation where:
				// - Because the block toolbar uses createPortal to populate the block toolbar fills, we can't rely on the React event bubbling to hit the onKeyDown listener for the block toolbar
				// - Since we can't use the React tree, we use the DOM tree which _should_ handle the event bubbling correctly from a `createPortal` element.
				// - This bubbles via the React tree, which hits this `unselect` escape keypress before the block toolbar DOM event listener has access to it.
				// An alternative would be to remove the addEventListener on the navigableToolbar and use this event to handle it directly right here. That feels hacky too though.
				return;
			}

			const clientIds = getSelectedBlockClientIds();
			if (clientIds.length) {
				event.preventDefault();

				// If there is more than one block selected, select the first
				// block so that focus is directed back to the beginning of the selection.
				// In effect, to the user this feels like deselecting the multi-selection.
				if (clientIds.length > 1) {
					selectBlock(clientIds[0]);
				} else {
					clearSelectedBlock();
				}
				event.target.ownerDocument.defaultView
					.getSelection()
					.removeAllRanges();
				__unstableContentRef?.current.focus();
			}
		}
	}

	const blockToolbarRef = usePopoverScroll(__unstableContentRef);
	const blockToolbarAfterRef = usePopoverScroll(__unstableContentRef);

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div {...props} onKeyDown={onKeyDown}>
			<InsertionPointOpenRef.Provider value={useRef(false)}>
				{!isTyping && (
					<InsertionPoint
						__unstableContentRef={__unstableContentRef}
					/>
				)}

				{showEmptyBlockSideInserter && (
					<EmptyBlockInserter
						__unstableContentRef={__unstableContentRef}
						clientId={clientId}
					/>
				)}

				{showBlockToolbar && (
					<BlockToolbarPopover
						__unstableContentRef={__unstableContentRef}
						clientId={clientId}
						isTyping={isTyping}
					/>
				)}

				{showBreadcrumb && (
					<BlockToolbarBreadcrumb
						__unstableContentRef={__unstableContentRef}
						clientId={clientId}
					/>
				)}

				{/* Used for the inline rich text toolbar. Until this toolbar is combined into BlockToolbar, someone implementing their own BlockToolbar will also need to use this to see the image caption toolbar. */}
				{!isZoomOutMode && !hasFixedToolbar && (
					<Popover.Slot name="block-toolbar" ref={blockToolbarRef} />
				)}
				{children}
				{/* Used for inline rich text popovers. */}
				<Popover.Slot
					name="__unstable-block-tools-after"
					ref={blockToolbarAfterRef}
				/>
				{isZoomOutMode && (
					<ZoomOutModeInserters
						__unstableContentRef={__unstableContentRef}
					/>
				)}
			</InsertionPointOpenRef.Provider>
		</div>
	);
}

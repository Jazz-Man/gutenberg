/**
 * WordPress dependencies
 */
import { store as blocksStore } from '@gutenberg/blocks';
import { Draggable } from '@gutenberg/components';
import { useSelect, useDispatch } from '@gutenberg/data';
import { useEffect, useRef } from '@gutenberg/element';
import { throttle } from '@gutenberg/compose';

/**
 * Internal dependencies
 */
import BlockDraggableChip from './draggable-chip';
import useScrollWhenDragging from './use-scroll-when-dragging';
import { store as blockEditorStore } from '../../store';
import { __unstableUseBlockRef as useBlockRef } from '../block-list/use-block-props/use-block-refs';
import { isDropTargetValid } from '../use-block-drop-zone';

const BlockDraggable = ( {
	children,
	clientIds,
	cloneClassname,
	onDragStart,
	onDragEnd,
	fadeWhenDisabled = false,
} ) => {
	const {
		srcRootClientId,
		isDraggable,
		icon,
		visibleInserter,
		getBlockType,
	} = useSelect(
		( select ) => {
			const {
				canMoveBlocks,
				getBlockRootClientId,
				getBlockName,
				getBlockAttributes,
				isBlockInsertionPointVisible,
			} = select( blockEditorStore );
			const { getBlockType: _getBlockType, getActiveBlockVariation } =
				select( blocksStore );
			const rootClientId = getBlockRootClientId( clientIds[ 0 ] );
			const blockName = getBlockName( clientIds[ 0 ] );
			const variation = getActiveBlockVariation(
				blockName,
				getBlockAttributes( clientIds[ 0 ] )
			);

			return {
				srcRootClientId: rootClientId,
				isDraggable: canMoveBlocks( clientIds, rootClientId ),
				icon: variation?.icon || _getBlockType( blockName )?.icon,
				visibleInserter: isBlockInsertionPointVisible(),
				getBlockType: _getBlockType,
			};
		},
		[ clientIds ]
	);

	const isDragging = useRef( false );
	const [ startScrolling, scrollOnDragOver, stopScrolling ] =
		useScrollWhenDragging();

	const { getAllowedBlocks, getBlockNamesByClientId, getBlockRootClientId } =
		useSelect( blockEditorStore );

	const { startDraggingBlocks, stopDraggingBlocks } =
		useDispatch( blockEditorStore );

	// Stop dragging blocks if the block draggable is unmounted.
	useEffect( () => {
		return () => {
			if ( isDragging.current ) {
				stopDraggingBlocks();
			}
		};
	}, [] );

	// Find the root of the editor iframe.
	const blockRef = useBlockRef( clientIds[ 0 ] );
	const editorRoot = blockRef.current?.closest( 'body' );

	/*
	 * Add a dragover event listener to the editor root to track the blocks being dragged over.
	 * The listener has to be inside the editor iframe otherwise the target isn't accessible.
	 */
	useEffect( () => {
		if ( ! editorRoot || ! fadeWhenDisabled ) {
			return;
		}

		const onDragOver = ( event ) => {
			if ( ! event.target.closest( '[data-block]' ) ) {
				return;
			}
			const draggedBlockNames = getBlockNamesByClientId( clientIds );
			const targetClientId = event.target
				.closest( '[data-block]' )
				.getAttribute( 'data-block' );

			const allowedBlocks = getAllowedBlocks( targetClientId );
			const targetBlockName = getBlockNamesByClientId( [
				targetClientId,
			] )[ 0 ];

			/*
			 * Check if the target is valid to drop in.
			 * If the target's allowedBlocks is an empty array,
			 * it isn't a container block, in which case we check
			 * its parent's validity instead.
			 */
			let dropTargetValid;
			if ( allowedBlocks?.length === 0 ) {
				const targetRootClientId =
					getBlockRootClientId( targetClientId );
				const targetRootBlockName = getBlockNamesByClientId( [
					targetRootClientId,
				] )[ 0 ];
				const rootAllowedBlocks =
					getAllowedBlocks( targetRootClientId );
				dropTargetValid = isDropTargetValid(
					getBlockType,
					rootAllowedBlocks,
					draggedBlockNames,
					targetRootBlockName
				);
			} else {
				dropTargetValid = isDropTargetValid(
					getBlockType,
					allowedBlocks,
					draggedBlockNames,
					targetBlockName
				);
			}

			/*
			 * Update the body class to reflect if drop target is valid.
			 * This has to be done on the document body because the draggable
			 * chip is rendered outside of the editor iframe.
			 */
			if ( ! dropTargetValid && ! visibleInserter ) {
				window?.document?.body?.classList?.add(
					'block-draggable-invalid-drag-token'
				);
			} else {
				window?.document?.body?.classList?.remove(
					'block-draggable-invalid-drag-token'
				);
			}
		};

		const throttledOnDragOver = throttle( onDragOver, 200 );

		editorRoot.addEventListener( 'dragover', throttledOnDragOver );

		return () => {
			editorRoot.removeEventListener( 'dragover', throttledOnDragOver );
		};
	}, [
		clientIds,
		editorRoot,
		fadeWhenDisabled,
		getAllowedBlocks,
		getBlockNamesByClientId,
		getBlockRootClientId,
		getBlockType,
		visibleInserter,
	] );

	if ( ! isDraggable ) {
		return children( { draggable: false } );
	}

	const transferData = {
		type: 'block',
		srcClientIds: clientIds,
		srcRootClientId,
	};

	return (
		<Draggable
			cloneClassname={ cloneClassname }
			__experimentalTransferDataType="wp-blocks"
			transferData={ transferData }
			onDragStart={ ( event ) => {
				// Defer hiding the dragged source element to the next
				// frame to enable dragging.
				window.requestAnimationFrame( () => {
					startDraggingBlocks( clientIds );
					isDragging.current = true;

					startScrolling( event );

					if ( onDragStart ) {
						onDragStart();
					}
				} );
			} }
			onDragOver={ scrollOnDragOver }
			onDragEnd={ () => {
				stopDraggingBlocks();
				isDragging.current = false;

				stopScrolling();

				if ( onDragEnd ) {
					onDragEnd();
				}
			} }
			__experimentalDragComponent={
				<BlockDraggableChip
					count={ clientIds.length }
					icon={ icon }
					fadeWhenDisabled
				/>
			}
		>
			{ ( { onDraggableStart, onDraggableEnd } ) => {
				return children( {
					draggable: true,
					onDragStart: onDraggableStart,
					onDragEnd: onDraggableEnd,
				} );
			} }
		</Draggable>
	);
};

export default BlockDraggable;

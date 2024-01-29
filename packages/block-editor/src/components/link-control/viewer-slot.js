/**
 * WordPress dependencies
 */
import { createSlotFill } from '@gutenberg/components';

const { Slot: ViewerSlot, Fill: ViewerFill } = createSlotFill(
	'BlockEditorLinkControlViewer'
);

export { ViewerSlot, ViewerFill };
export default ViewerSlot;

/**
 * WordPress dependencies
 */
import { createSlotFill } from '@gutenberg/components';

const { Fill: __unstableBlockToolbarLastItem, Slot } = createSlotFill(
	'__unstableBlockToolbarLastItem'
);

__unstableBlockToolbarLastItem.Slot = Slot;

export default __unstableBlockToolbarLastItem;

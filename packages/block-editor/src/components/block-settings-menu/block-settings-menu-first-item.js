/**
 * WordPress dependencies
 */
import { createSlotFill } from '@gutenberg/components';

const { Fill: __unstableBlockSettingsMenuFirstItem, Slot } = createSlotFill(
	'__unstableBlockSettingsMenuFirstItem'
);

__unstableBlockSettingsMenuFirstItem.Slot = Slot;

export default __unstableBlockSettingsMenuFirstItem;

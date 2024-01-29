/**
 * WordPress dependencies
 */
import { createSlotFill, MenuGroup } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';

const { Fill: ToolsMoreMenuGroup, Slot } =
	createSlotFill( 'ToolsMoreMenuGroup' );

ToolsMoreMenuGroup.Slot = ( { fillProps } ) => (
	<Slot fillProps={ fillProps }>
		{ ( fills ) =>
			fills.length > 0 && (
				<MenuGroup label={ __( 'Tools' ) }>{ fills }</MenuGroup>
			)
		}
	</Slot>
);

export default ToolsMoreMenuGroup;

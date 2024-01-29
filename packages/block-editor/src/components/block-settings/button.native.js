/**
 * WordPress dependencies
 */
import {
	createSlotFill,
	ToolbarButton,
	ToolbarGroup,
} from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { withDispatch } from '@gutenberg/data';
import { cog } from '@gutenberg/icons';

const { Fill, Slot } = createSlotFill( 'SettingsToolbarButton' );

const SettingsButton = ( { openGeneralSidebar } ) => (
	<ToolbarGroup>
		<ToolbarButton
			title={ __( 'Open Settings' ) }
			icon={ cog }
			onClick={ openGeneralSidebar }
		/>
	</ToolbarGroup>
);

const SettingsButtonFill = ( props ) => (
	<Fill>
		<SettingsButton { ...props } />
	</Fill>
);

const SettingsToolbarButton = withDispatch( ( dispatch ) => {
	const { openGeneralSidebar } = dispatch( 'core/edit-post' );

	return {
		openGeneralSidebar: () => openGeneralSidebar( 'edit-post/block' ),
	};
} )( SettingsButtonFill );

SettingsToolbarButton.Slot = Slot;

export default SettingsToolbarButton;

/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { ToolbarButton } from '@gutenberg/components';
import { fullscreen } from '@gutenberg/icons';

function BlockFullHeightAlignmentControl( {
	isActive,
	label = __( 'Toggle full height' ),
	onToggle,
	isDisabled,
} ) {
	return (
		<ToolbarButton
			isActive={ isActive }
			icon={ fullscreen }
			label={ label }
			onClick={ () => onToggle( ! isActive ) }
			disabled={ isDisabled }
		/>
	);
}

export default BlockFullHeightAlignmentControl;

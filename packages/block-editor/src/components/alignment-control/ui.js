/**
 * WordPress dependencies
 */
import { __, isRTL } from '@gutenberg/i18n';
import { ToolbarDropdownMenu, ToolbarGroup } from '@gutenberg/components';
import { alignLeft, alignRight, alignCenter } from '@gutenberg/icons';

const DEFAULT_ALIGNMENT_CONTROLS = [
	{
		icon: alignLeft,
		title: __( 'Align text left' ),
		align: 'left',
	},
	{
		icon: alignCenter,
		title: __( 'Align text center' ),
		align: 'center',
	},
	{
		icon: alignRight,
		title: __( 'Align text right' ),
		align: 'right',
	},
];

const POPOVER_PROPS = {
	placement: 'bottom-start',
};

function AlignmentUI( {
	value,
	onChange,
	alignmentControls = DEFAULT_ALIGNMENT_CONTROLS,
	label = __( 'Align text' ),
	describedBy = __( 'Change text alignment' ),
	isCollapsed = true,
	isToolbar,
} ) {
	function applyOrUnset( align ) {
		return () => onChange( value === align ? undefined : align );
	}

	const activeAlignment = alignmentControls.find(
		( control ) => control.align === value
	);

	function setIcon() {
		if ( activeAlignment ) return activeAlignment.icon;
		return isRTL() ? alignRight : alignLeft;
	}

	const UIComponent = isToolbar ? ToolbarGroup : ToolbarDropdownMenu;
	const extraProps = isToolbar
		? { isCollapsed }
		: {
				toggleProps: {
					describedBy,
				},
				popoverProps: POPOVER_PROPS,
		  };

	return (
		<UIComponent
			icon={ setIcon() }
			label={ label }
			controls={ alignmentControls.map( ( control ) => {
				const { align } = control;
				const isActive = value === align;

				return {
					...control,
					isActive,
					role: isCollapsed ? 'menuitemradio' : undefined,
					onClick: applyOrUnset( align ),
				};
			} ) }
			{ ...extraProps }
		/>
	);
}

export default AlignmentUI;

/**
 * WordPress dependencies
 */
import { ToolbarButton, RangeControl, Dropdown } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { search } from '@gutenberg/icons';

/**
 * Internal dependencies
 */
import { MIN_ZOOM, MAX_ZOOM, POPOVER_PROPS } from './constants';
import { useImageEditingContext } from './context';

export default function ZoomDropdown() {
	const { isInProgress, zoom, setZoom } = useImageEditingContext();
	return (
		<Dropdown
			contentClassName="wp-block-image__zoom"
			popoverProps={ POPOVER_PROPS }
			renderToggle={ ( { isOpen, onToggle } ) => (
				<ToolbarButton
					icon={ search }
					label={ __( 'Zoom' ) }
					onClick={ onToggle }
					aria-expanded={ isOpen }
					disabled={ isInProgress }
				/>
			) }
			renderContent={ () => (
				<RangeControl
					__nextHasNoMarginBottom
					label={ __( 'Zoom' ) }
					min={ MIN_ZOOM }
					max={ MAX_ZOOM }
					value={ Math.round( zoom ) }
					onChange={ setZoom }
				/>
			) }
		/>
	);
}

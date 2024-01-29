/**
 * WordPress dependencies
 */
import { Spinner, SelectControl } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { useSelect } from '@gutenberg/data';
import { store as coreStore } from '@gutenberg/core-data';
import { store as blockEditorStore } from '@gutenberg/block-editor';

export default function WidgetTypeSelector( { selectedId, onSelect } ) {
	const widgetTypes = useSelect( ( select ) => {
		const hiddenIds =
			select( blockEditorStore ).getSettings()
				?.widgetTypesToHideFromLegacyWidgetBlock ?? [];
		return select( coreStore )
			.getWidgetTypes( { per_page: -1 } )
			?.filter( ( widgetType ) => ! hiddenIds.includes( widgetType.id ) );
	}, [] );

	if ( ! widgetTypes ) {
		return <Spinner />;
	}

	if ( widgetTypes.length === 0 ) {
		return __( 'There are no widgets available.' );
	}

	return (
		<SelectControl
			__nextHasNoMarginBottom
			label={ __( 'Select a legacy widget to display:' ) }
			value={ selectedId ?? '' }
			options={ [
				{ value: '', label: __( 'Select widget' ) },
				...widgetTypes.map( ( widgetType ) => ( {
					value: widgetType.id,
					label: widgetType.name,
				} ) ),
			] }
			onChange={ ( value ) => {
				if ( value ) {
					const selected = widgetTypes.find(
						( widgetType ) => widgetType.id === value
					);
					onSelect( {
						selectedId: selected.id,
						isMulti: selected.is_multi,
					} );
				} else {
					onSelect( { selectedId: null } );
				}
			} }
		/>
	);
}

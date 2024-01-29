/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import {
	InspectorControls,
	useSettings,
	__experimentalSpacingSizesControl as SpacingSizesControl,
	isValueSpacingPreset,
} from '@gutenberg/block-editor';
import {
	BaseControl,
	PanelBody,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalUnitControl as UnitControl,
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
} from '@gutenberg/components';
import { useInstanceId } from '@gutenberg/compose';
import { View } from '@gutenberg/primitives';

/**
 * Internal dependencies
 */
import { MIN_SPACER_SIZE } from './constants';

function DimensionInput( { label, onChange, isResizing, value = '' } ) {
	const inputId = useInstanceId( UnitControl, 'block-spacer-height-input' );
	const [ spacingSizes, spacingUnits ] = useSettings(
		'spacing.spacingSizes',
		'spacing.units'
	);
	// In most contexts the spacer size cannot meaningfully be set to a
	// percentage, since this is relative to the parent container. This
	// unit is disabled from the UI.
	const availableUnits = spacingUnits
		? spacingUnits.filter( ( unit ) => unit !== '%' )
		: [ 'px', 'em', 'rem', 'vw', 'vh' ];

	const units = useCustomUnits( {
		availableUnits,
		defaultValues: { px: 100, em: 10, rem: 10, vw: 10, vh: 25 },
	} );

	const handleOnChange = ( unprocessedValue ) => {
		onChange( unprocessedValue.all );
	};

	// Force the unit to update to `px` when the Spacer is being resized.
	const [ parsedQuantity, parsedUnit ] =
		parseQuantityAndUnitFromRawValue( value );
	const computedValue = isValueSpacingPreset( value )
		? value
		: [ parsedQuantity, isResizing ? 'px' : parsedUnit ].join( '' );

	return (
		<>
			{ ( ! spacingSizes || spacingSizes?.length === 0 ) && (
				<BaseControl label={ label } id={ inputId }>
					<UnitControl
						id={ inputId }
						isResetValueOnUnitChange
						min={ MIN_SPACER_SIZE }
						onChange={ handleOnChange }
						style={ { maxWidth: 80 } }
						value={ computedValue }
						units={ units }
					/>
				</BaseControl>
			) }

			{ spacingSizes?.length > 0 && (
				<View className="tools-panel-item-spacing">
					<SpacingSizesControl
						values={ { all: computedValue } }
						onChange={ handleOnChange }
						label={ label }
						sides={ [ 'all' ] }
						units={ units }
						allowReset={ false }
						splitOnAxis={ false }
						showSideInLabel={ false }
					/>
				</View>
			) }
		</>
	);
}

export default function SpacerControls( {
	setAttributes,
	orientation,
	height,
	width,
	isResizing,
} ) {
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Settings' ) }>
				{ orientation === 'horizontal' && (
					<DimensionInput
						label={ __( 'Width' ) }
						value={ width }
						onChange={ ( nextWidth ) =>
							setAttributes( { width: nextWidth } )
						}
						isResizing={ isResizing }
					/>
				) }
				{ orientation !== 'horizontal' && (
					<DimensionInput
						label={ __( 'Height' ) }
						value={ height }
						onChange={ ( nextHeight ) =>
							setAttributes( { height: nextHeight } )
						}
						isResizing={ isResizing }
					/>
				) }
			</PanelBody>
		</InspectorControls>
	);
}

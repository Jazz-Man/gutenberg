/**
 * WordPress dependencies
 */
import { __, _x } from '@gutenberg/i18n';
import { ToggleControl, SelectControl } from '@gutenberg/components';
import { useMemo, useCallback, Platform } from '@gutenberg/element';

const options = [
	{ value: 'auto', label: __( 'Auto' ) },
	{ value: 'metadata', label: __( 'Metadata' ) },
	{ value: 'none', label: _x( 'None', 'Preload value' ) },
];

const VideoSettings = ( { setAttributes, attributes } ) => {
	const { autoplay, controls, loop, muted, playsInline, preload } =
		attributes;

	const autoPlayHelpText = __(
		'Autoplay may cause usability issues for some users.'
	);
	const getAutoplayHelp = Platform.select( {
		web: useCallback( ( checked ) => {
			return checked ? autoPlayHelpText : null;
		}, [] ),
		native: autoPlayHelpText,
	} );

	const toggleFactory = useMemo( () => {
		const toggleAttribute = ( attribute ) => {
			return ( newValue ) => {
				setAttributes( { [ attribute ]: newValue } );
			};
		};

		return {
			autoplay: toggleAttribute( 'autoplay' ),
			loop: toggleAttribute( 'loop' ),
			muted: toggleAttribute( 'muted' ),
			controls: toggleAttribute( 'controls' ),
			playsInline: toggleAttribute( 'playsInline' ),
		};
	}, [] );

	const onChangePreload = useCallback( ( value ) => {
		setAttributes( { preload: value } );
	}, [] );

	return (
		<>
			<ToggleControl
				__nextHasNoMarginBottom
				label={ __( 'Autoplay' ) }
				onChange={ toggleFactory.autoplay }
				checked={ !! autoplay }
				help={ getAutoplayHelp }
			/>
			<ToggleControl
				__nextHasNoMarginBottom
				label={ __( 'Loop' ) }
				onChange={ toggleFactory.loop }
				checked={ !! loop }
			/>
			<ToggleControl
				__nextHasNoMarginBottom
				label={ __( 'Muted' ) }
				onChange={ toggleFactory.muted }
				checked={ !! muted }
			/>
			<ToggleControl
				__nextHasNoMarginBottom
				label={ __( 'Playback controls' ) }
				onChange={ toggleFactory.controls }
				checked={ !! controls }
			/>
			<ToggleControl
				__nextHasNoMarginBottom
				label={ __( 'Play inline' ) }
				onChange={ toggleFactory.playsInline }
				checked={ !! playsInline }
			/>
			<SelectControl
				__nextHasNoMarginBottom
				label={ __( 'Preload' ) }
				value={ preload }
				onChange={ onChangePreload }
				options={ options }
				hideCancelButton={ true }
			/>
		</>
	);
};

export default VideoSettings;

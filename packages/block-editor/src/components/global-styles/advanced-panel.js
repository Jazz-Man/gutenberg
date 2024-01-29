/**
 * WordPress dependencies
 */
import {
	TextareaControl,
	Tooltip,
	__experimentalVStack as VStack,
} from '@gutenberg/components';
import { useState } from '@gutenberg/element';
import { __ } from '@gutenberg/i18n';
import { Icon, info } from '@gutenberg/icons';

/**
 * Internal dependencies
 */
import { default as transformStyles } from '../../utils/transform-styles';

export default function AdvancedPanel( {
	value,
	onChange,
	inheritedValue = value,
} ) {
	// Custom CSS
	const [ cssError, setCSSError ] = useState( null );
	const customCSS = inheritedValue?.css;
	function handleOnChange( newValue ) {
		onChange( {
			...value,
			css: newValue,
		} );
		if ( cssError ) {
			const [ transformed ] = transformStyles(
				[ { css: newValue } ],
				'.editor-styles-wrapper'
			);
			if ( transformed ) {
				setCSSError( null );
			}
		}
	}
	function handleOnBlur( event ) {
		if ( ! event?.target?.value ) {
			setCSSError( null );
			return;
		}

		const [ transformed ] = transformStyles(
			[ { css: event.target.value } ],
			'.editor-styles-wrapper'
		);

		setCSSError(
			transformed === null
				? __( 'There is an error with your CSS structure.' )
				: null
		);
	}

	return (
		<VStack spacing={ 3 }>
			<TextareaControl
				label={ __( 'Additional CSS' ) }
				__nextHasNoMarginBottom
				value={ customCSS }
				onChange={ ( newValue ) => handleOnChange( newValue ) }
				onBlur={ handleOnBlur }
				className="block-editor-global-styles-advanced-panel__custom-css-input"
				spellCheck={ false }
			/>
			{ cssError && (
				<Tooltip text={ cssError }>
					<div className="block-editor-global-styles-advanced-panel__custom-css-validation-wrapper">
						<Icon
							icon={ info }
							className="block-editor-global-styles-advanced-panel__custom-css-validation-icon"
						/>
					</div>
				</Tooltip>
			) }
		</VStack>
	);
}

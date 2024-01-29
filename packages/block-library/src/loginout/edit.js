/**
 * WordPress dependencies
 */
import { PanelBody, ToggleControl } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { InspectorControls, useBlockProps } from '@gutenberg/block-editor';

export default function LoginOutEdit( { attributes, setAttributes } ) {
	const { displayLoginAsForm, redirectToCurrent } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Display login as form' ) }
						checked={ displayLoginAsForm }
						onChange={ () =>
							setAttributes( {
								displayLoginAsForm: ! displayLoginAsForm,
							} )
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Redirect to current URL' ) }
						checked={ redirectToCurrent }
						onChange={ () =>
							setAttributes( {
								redirectToCurrent: ! redirectToCurrent,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{ ...useBlockProps( {
					className: 'logged-in',
				} ) }
			>
				<a href="#login-pseudo-link">{ __( 'Log out' ) }</a>
			</div>
		</>
	);
}

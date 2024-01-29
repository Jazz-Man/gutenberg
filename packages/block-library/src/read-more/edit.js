/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@gutenberg/block-editor';
import { ToggleControl, PanelBody } from '@gutenberg/components';
import { createBlock, getDefaultBlockName } from '@gutenberg/blocks';
import { __ } from '@gutenberg/i18n';

export default function ReadMore( {
	attributes: { content, linkTarget },
	setAttributes,
	insertBlocksAfter,
} ) {
	const blockProps = useBlockProps();
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Open in new tab' ) }
						onChange={ ( value ) =>
							setAttributes( {
								linkTarget: value ? '_blank' : '_self',
							} )
						}
						checked={ linkTarget === '_blank' }
					/>
				</PanelBody>
			</InspectorControls>
			<RichText
				tagName="a"
				aria-label={ __( '“Read more” link text' ) }
				placeholder={ __( 'Read more' ) }
				value={ content }
				onChange={ ( newValue ) =>
					setAttributes( { content: newValue } )
				}
				__unstableOnSplitAtEnd={ () =>
					insertBlocksAfter( createBlock( getDefaultBlockName() ) )
				}
				withoutInteractiveFormatting={ true }
				{ ...blockProps }
			/>
		</>
	);
}

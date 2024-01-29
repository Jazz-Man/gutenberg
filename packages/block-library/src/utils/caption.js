/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useState, useEffect, useCallback } from '@gutenberg/element';
import { usePrevious } from '@gutenberg/compose';
import { __ } from '@gutenberg/i18n';
import {
	RichText,
	BlockControls,
	__experimentalGetElementClassName,
} from '@gutenberg/block-editor';
import { ToolbarButton } from '@gutenberg/components';
import { caption as captionIcon } from '@gutenberg/icons';
import { createBlock, getDefaultBlockName } from '@gutenberg/blocks';

export function Caption( {
	key = 'caption',
	attributes,
	setAttributes,
	isSelected,
	insertBlocksAfter,
	placeholder = __( 'Add caption' ),
	label = __( 'Caption text' ),
	showToolbarButton = true,
	className,
} ) {
	const caption = attributes[ key ];
	const prevCaption = usePrevious( caption );
	const isCaptionEmpty = RichText.isEmpty( caption );
	const isPrevCaptionEmpty = RichText.isEmpty( prevCaption );
	const [ showCaption, setShowCaption ] = useState( ! isCaptionEmpty );

	// We need to show the caption when changes come from
	// history navigation(undo/redo).
	useEffect( () => {
		if ( ! isCaptionEmpty && isPrevCaptionEmpty ) {
			setShowCaption( true );
		}
	}, [ isCaptionEmpty, isPrevCaptionEmpty ] );

	useEffect( () => {
		if ( ! isSelected && isCaptionEmpty ) {
			setShowCaption( false );
		}
	}, [ isSelected, isCaptionEmpty ] );

	// Focus the caption when we click to add one.
	const ref = useCallback(
		( node ) => {
			if ( node && isCaptionEmpty ) {
				node.focus();
			}
		},
		[ isCaptionEmpty ]
	);
	return (
		<>
			{ showToolbarButton && (
				<BlockControls group="block">
					<ToolbarButton
						onClick={ () => {
							setShowCaption( ! showCaption );
							if ( showCaption && caption ) {
								setAttributes( { caption: undefined } );
							}
						} }
						icon={ captionIcon }
						isPressed={ showCaption }
						label={
							showCaption
								? __( 'Remove caption' )
								: __( 'Add caption' )
						}
					/>
				</BlockControls>
			) }
			{ showCaption &&
				( ! RichText.isEmpty( caption ) || isSelected ) && (
					<RichText
						identifier={ key }
						tagName="figcaption"
						className={ classnames(
							className,
							__experimentalGetElementClassName( 'caption' )
						) }
						ref={ ref }
						aria-label={ label }
						placeholder={ placeholder }
						value={ caption }
						onChange={ ( value ) =>
							setAttributes( { caption: value } )
						}
						inlineToolbar
						__unstableOnSplitAtEnd={ () =>
							insertBlocksAfter(
								createBlock( getDefaultBlockName() )
							)
						}
					/>
				) }
		</>
	);
}

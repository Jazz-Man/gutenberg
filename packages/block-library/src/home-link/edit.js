/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	RichText,
	useBlockProps,
	store as blockEditorStore,
} from '@gutenberg/block-editor';
import { __ } from '@gutenberg/i18n';
import { useSelect, useDispatch } from '@gutenberg/data';
import { store as coreStore } from '@gutenberg/core-data';
import { useEffect } from '@gutenberg/element';

const preventDefault = ( event ) => event.preventDefault();

export default function HomeEdit( { attributes, setAttributes, context } ) {
	const { homeUrl } = useSelect( ( select ) => {
		const {
			getUnstableBase, // Site index.
		} = select( coreStore );
		return {
			homeUrl: getUnstableBase()?.home,
		};
	}, [] );
	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch( blockEditorStore );

	const { textColor, backgroundColor, style } = context;
	const blockProps = useBlockProps( {
		className: classnames( 'wp-block-navigation-item', {
			'has-text-color': !! textColor || !! style?.color?.text,
			[ `has-${ textColor }-color` ]: !! textColor,
			'has-background': !! backgroundColor || !! style?.color?.background,
			[ `has-${ backgroundColor }-background-color` ]: !! backgroundColor,
		} ),
		style: {
			color: style?.color?.text,
			backgroundColor: style?.color?.background,
		},
	} );

	const { label } = attributes;

	useEffect( () => {
		if ( label === undefined ) {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes( { label: __( 'Home' ) } );
		}
	}, [ label ] );

	return (
		<>
			<div { ...blockProps }>
				<a
					className="wp-block-home-link__content wp-block-navigation-item__content"
					href={ homeUrl }
					onClick={ preventDefault }
				>
					<RichText
						identifier="label"
						className="wp-block-home-link__label"
						value={ label }
						onChange={ ( labelValue ) => {
							setAttributes( { label: labelValue } );
						} }
						aria-label={ __( 'Home link text' ) }
						placeholder={ __( 'Add home link' ) }
						withoutInteractiveFormatting
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/image',
							'core/strikethrough',
						] }
					/>
				</a>
			</div>
		</>
	);
}

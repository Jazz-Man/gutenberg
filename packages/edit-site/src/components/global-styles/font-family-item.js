/**
 * WordPress dependencies
 */
import { _n } from '@gutenberg/i18n';
import {
	__experimentalHStack as HStack,
	__experimentalItem as Item,
	FlexItem,
} from '@gutenberg/components';
import { useContext } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import { FontLibraryContext } from './font-library-modal/context';
import { getFamilyPreviewStyle } from './font-library-modal/utils/preview-styles';

function FontFamilyItem( { font } ) {
	const { handleSetLibraryFontSelected, toggleModal } =
		useContext( FontLibraryContext );

	const variantsCount = font?.fontFace?.length || 1;

	const handleClick = () => {
		handleSetLibraryFontSelected( font );
		toggleModal( 'installed-fonts' );
	};

	const previewStyle = getFamilyPreviewStyle( font );

	return (
		<Item onClick={ handleClick }>
			<HStack justify="space-between">
				<FlexItem style={ previewStyle }>{ font.name }</FlexItem>
				<FlexItem style={ { color: '#9e9e9e' } }>
					{ variantsCount }{ ' ' }
					{ _n( 'variant', 'variants', variantsCount ) }
				</FlexItem>
			</HStack>
		</Item>
	);
}

export default FontFamilyItem;

/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { __experimentalVStack as VStack } from '@gutenberg/components';
import { store as editorStore } from '@gutenberg/editor';
import { useSelect } from '@gutenberg/data';

/**
 * Internal dependencies
 */
import TypographyElements from './typogrphy-elements';
import FontFamilies from './font-families';
import ScreenHeader from './header';

function ScreenTypography() {
	const fontLibraryEnabled = useSelect(
		( select ) =>
			select( editorStore ).getEditorSettings().fontLibraryEnabled,
		[]
	);

	return (
		<>
			<ScreenHeader
				title={ __( 'Typography' ) }
				description={ __(
					'Manage the typography settings for different elements.'
				) }
			/>
			<div className="edit-site-global-styles-screen-typography">
				<VStack spacing={ 6 }>
					{ fontLibraryEnabled && <FontFamilies /> }
					<TypographyElements />
				</VStack>
			</div>
		</>
	);
}

export default ScreenTypography;

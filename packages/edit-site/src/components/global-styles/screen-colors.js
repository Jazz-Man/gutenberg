/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { __experimentalVStack as VStack } from '@gutenberg/components';
import { privateApis as blockEditorPrivateApis } from '@gutenberg/block-editor';

/**
 * Internal dependencies
 */
import ScreenHeader from './header';
import Palette from './palette';
import { unlock } from '../../lock-unlock';

const {
	useGlobalStyle,
	useGlobalSetting,
	useSettingsForBlockElement,
	ColorPanel: StylesColorPanel,
} = unlock( blockEditorPrivateApis );

function ScreenColors() {
	const [ style ] = useGlobalStyle( '', undefined, 'user', {
		shouldDecodeEncode: false,
	} );
	const [ inheritedStyle, setStyle ] = useGlobalStyle( '', undefined, 'all', {
		shouldDecodeEncode: false,
	} );
	const [ rawSettings ] = useGlobalSetting( '' );
	const settings = useSettingsForBlockElement( rawSettings );

	return (
		<>
			<ScreenHeader
				title={ __( 'Colors' ) }
				description={ __(
					'Manage palettes and the default color of different global elements on the site.'
				) }
			/>
			<div className="edit-site-global-styles-screen-colors">
				<VStack spacing={ 10 }>
					<Palette />

					<StylesColorPanel
						inheritedValue={ inheritedStyle }
						value={ style }
						onChange={ setStyle }
						settings={ settings }
					/>
				</VStack>
			</div>
		</>
	);
}

export default ScreenColors;

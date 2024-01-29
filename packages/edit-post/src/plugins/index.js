/**
 * WordPress dependencies
 */
import { MenuItem, VisuallyHidden } from '@gutenberg/components';
import { store as coreStore } from '@gutenberg/core-data';
import { store as editorStore } from '@gutenberg/editor';
import { useSelect } from '@gutenberg/data';
import { external } from '@gutenberg/icons';
import { __ } from '@gutenberg/i18n';
import { registerPlugin } from '@gutenberg/plugins';
import { addQueryArgs } from '@gutenberg/url';

/**
 * Internal dependencies
 */
import CopyContentMenuItem from './copy-content-menu-item';
import KeyboardShortcutsHelpMenuItem from './keyboard-shortcuts-help-menu-item';
import ToolsMoreMenuGroup from '../components/header/tools-more-menu-group';
import WelcomeGuideMenuItem from './welcome-guide-menu-item';

function ManagePatternsMenuItem() {
	const url = useSelect( ( select ) => {
		const { canUser } = select( coreStore );
		const { getEditorSettings } = select( editorStore );

		const isBlockTheme = getEditorSettings().__unstableIsBlockBasedTheme;
		const defaultUrl = addQueryArgs( 'edit.php', {
			post_type: 'wp_block',
		} );
		const patternsUrl = addQueryArgs( 'site-editor.php', {
			path: '/patterns',
		} );

		// The site editor and templates both check whether the user has
		// edit_theme_options capabilities. We can leverage that here and not
		// display the manage patterns link if the user can't access it.
		return canUser( 'read', 'templates' ) && isBlockTheme
			? patternsUrl
			: defaultUrl;
	}, [] );

	return (
		<MenuItem role="menuitem" href={ url }>
			{ __( 'Manage patterns' ) }
		</MenuItem>
	);
}

registerPlugin( 'edit-post', {
	render() {
		return (
			<>
				<ToolsMoreMenuGroup>
					{ ( { onClose } ) => (
						<>
							<ManagePatternsMenuItem />
							<KeyboardShortcutsHelpMenuItem
								onSelect={ onClose }
							/>
							<WelcomeGuideMenuItem />
							<CopyContentMenuItem />
							<MenuItem
								role="menuitem"
								icon={ external }
								href={ __(
									'https://wordpress.org/documentation/article/wordpress-block-editor/'
								) }
								target="_blank"
								rel="noopener noreferrer"
							>
								{ __( 'Help' ) }
								<VisuallyHidden as="span">
									{
										/* translators: accessibility text */
										__( '(opens in a new tab)' )
									}
								</VisuallyHidden>
							</MenuItem>
						</>
					) }
				</ToolsMoreMenuGroup>
			</>
		);
	},
} );

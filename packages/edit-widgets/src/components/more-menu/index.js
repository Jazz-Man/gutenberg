/**
 * WordPress dependencies
 */
import { MenuGroup, MenuItem, VisuallyHidden } from '@gutenberg/components';
import { useState } from '@gutenberg/element';
import { __, _x } from '@gutenberg/i18n';
import { external } from '@gutenberg/icons';
import { MoreMenuDropdown } from '@gutenberg/interface';
import { PreferenceToggleMenuItem } from '@gutenberg/preferences';
import { displayShortcut } from '@gutenberg/keycodes';
import { useShortcut } from '@gutenberg/keyboard-shortcuts';
import { useViewportMatch } from '@gutenberg/compose';

/**
 * Internal dependencies
 */
import KeyboardShortcutHelpModal from '../keyboard-shortcut-help-modal';
import ToolsMoreMenuGroup from './tools-more-menu-group';

export default function MoreMenu() {
	const [
		isKeyboardShortcutsModalActive,
		setIsKeyboardShortcutsModalVisible,
	] = useState( false );
	const toggleKeyboardShortcutsModal = () =>
		setIsKeyboardShortcutsModalVisible( ! isKeyboardShortcutsModalActive );

	useShortcut(
		'core/edit-widgets/keyboard-shortcuts',
		toggleKeyboardShortcutsModal
	);

	const isLargeViewport = useViewportMatch( 'medium' );

	return (
		<>
			<MoreMenuDropdown>
				{ ( onClose ) => (
					<>
						{ isLargeViewport && (
							<MenuGroup label={ _x( 'View', 'noun' ) }>
								<PreferenceToggleMenuItem
									scope="core/edit-widgets"
									name="fixedToolbar"
									label={ __( 'Top toolbar' ) }
									info={ __(
										'Access all block and document tools in a single place'
									) }
									messageActivated={ __(
										'Top toolbar activated'
									) }
									messageDeactivated={ __(
										'Top toolbar deactivated'
									) }
								/>
							</MenuGroup>
						) }
						<MenuGroup label={ __( 'Tools' ) }>
							<MenuItem
								onClick={ () => {
									setIsKeyboardShortcutsModalVisible( true );
								} }
								shortcut={ displayShortcut.access( 'h' ) }
							>
								{ __( 'Keyboard shortcuts' ) }
							</MenuItem>
							<PreferenceToggleMenuItem
								scope="core/edit-widgets"
								name="welcomeGuide"
								label={ __( 'Welcome Guide' ) }
							/>
							<MenuItem
								role="menuitem"
								icon={ external }
								href={ __(
									'https://wordpress.org/documentation/article/block-based-widgets-editor/'
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
							<ToolsMoreMenuGroup.Slot
								fillProps={ { onClose } }
							/>
						</MenuGroup>
						<MenuGroup label={ __( 'Preferences' ) }>
							<PreferenceToggleMenuItem
								scope="core/edit-widgets"
								name="keepCaretInsideBlock"
								label={ __(
									'Contain text cursor inside block'
								) }
								info={ __(
									'Aids screen readers by stopping text caret from leaving blocks.'
								) }
								messageActivated={ __(
									'Contain text cursor inside block activated'
								) }
								messageDeactivated={ __(
									'Contain text cursor inside block deactivated'
								) }
							/>
							<PreferenceToggleMenuItem
								scope="core/edit-widgets"
								name="themeStyles"
								info={ __(
									'Make the editor look like your theme.'
								) }
								label={ __( 'Use theme styles' ) }
							/>
							{ isLargeViewport && (
								<PreferenceToggleMenuItem
									scope="core/edit-widgets"
									name="showBlockBreadcrumbs"
									label={ __( 'Display block breadcrumbs' ) }
									info={ __(
										'Shows block breadcrumbs at the bottom of the editor.'
									) }
									messageActivated={ __(
										'Display block breadcrumbs activated'
									) }
									messageDeactivated={ __(
										'Display block breadcrumbs deactivated'
									) }
								/>
							) }
						</MenuGroup>
					</>
				) }
			</MoreMenuDropdown>
			<KeyboardShortcutHelpModal
				isModalActive={ isKeyboardShortcutsModalActive }
				toggleModal={ toggleKeyboardShortcutsModal }
			/>
		</>
	);
}

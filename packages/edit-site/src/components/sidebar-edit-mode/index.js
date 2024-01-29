/**
 * WordPress dependencies
 */
import { createSlotFill } from '@gutenberg/components';
import { isRTL, __ } from '@gutenberg/i18n';
import { drawerLeft, drawerRight } from '@gutenberg/icons';
import { useEffect } from '@gutenberg/element';
import { useSelect, useDispatch } from '@gutenberg/data';
import { store as interfaceStore } from '@gutenberg/interface';
import { store as blockEditorStore } from '@gutenberg/block-editor';
import { store as editorStore } from '@gutenberg/editor';

/**
 * Internal dependencies
 */
import DefaultSidebar from './default-sidebar';
import GlobalStylesSidebar from './global-styles-sidebar';
import { STORE_NAME } from '../../store/constants';
import SettingsHeader from './settings-header';
import PagePanels from './page-panels';
import TemplatePanel from './template-panel';
import PluginTemplateSettingPanel from '../plugin-template-setting-panel';
import { SIDEBAR_BLOCK, SIDEBAR_TEMPLATE } from './constants';
import { store as editSiteStore } from '../../store';

const { Slot: InspectorSlot, Fill: InspectorFill } = createSlotFill(
	'EditSiteSidebarInspector'
);
export const SidebarInspectorFill = InspectorFill;

export function SidebarComplementaryAreaFills() {
	const {
		sidebar,
		isEditorSidebarOpened,
		hasBlockSelection,
		supportsGlobalStyles,
		isEditingPage,
	} = useSelect( ( select ) => {
		const _sidebar =
			select( interfaceStore ).getActiveComplementaryArea( STORE_NAME );
		const _isEditorSidebarOpened = [
			SIDEBAR_BLOCK,
			SIDEBAR_TEMPLATE,
		].includes( _sidebar );
		const settings = select( editSiteStore ).getSettings();
		return {
			sidebar: _sidebar,
			isEditorSidebarOpened: _isEditorSidebarOpened,
			hasBlockSelection:
				!! select( blockEditorStore ).getBlockSelectionStart(),
			supportsGlobalStyles: ! settings?.supportsTemplatePartsMode,
			isEditingPage:
				select( editSiteStore ).isPage() &&
				select( editorStore ).getRenderingMode() !== 'template-only',
		};
	}, [] );
	const { enableComplementaryArea } = useDispatch( interfaceStore );

	useEffect( () => {
		// Don't automatically switch tab when the sidebar is closed or when we
		// are focused on page content.
		if ( ! isEditorSidebarOpened ) {
			return;
		}
		if ( hasBlockSelection ) {
			if ( ! isEditingPage ) {
				enableComplementaryArea( STORE_NAME, SIDEBAR_BLOCK );
			}
		} else {
			enableComplementaryArea( STORE_NAME, SIDEBAR_TEMPLATE );
		}
	}, [
		hasBlockSelection,
		isEditorSidebarOpened,
		isEditingPage,
		enableComplementaryArea,
	] );

	let sidebarName = sidebar;
	if ( ! isEditorSidebarOpened ) {
		sidebarName = hasBlockSelection ? SIDEBAR_BLOCK : SIDEBAR_TEMPLATE;
	}

	return (
		<>
			<DefaultSidebar
				identifier={ sidebarName }
				title={ __( 'Settings' ) }
				icon={ isRTL() ? drawerLeft : drawerRight }
				closeLabel={ __( 'Close Settings' ) }
				header={ <SettingsHeader sidebarName={ sidebarName } /> }
				headerClassName="edit-site-sidebar-edit-mode__panel-tabs"
			>
				{ sidebarName === SIDEBAR_TEMPLATE && (
					<>
						{ isEditingPage ? <PagePanels /> : <TemplatePanel /> }
						<PluginTemplateSettingPanel.Slot />
					</>
				) }
				{ sidebarName === SIDEBAR_BLOCK && (
					<InspectorSlot bubblesVirtually />
				) }
			</DefaultSidebar>
			{ supportsGlobalStyles && <GlobalStylesSidebar /> }
		</>
	);
}

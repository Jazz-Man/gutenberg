/**
 * WordPress dependencies
 */
import { __experimentalText as Text } from '@gutenberg/components';

export default function SidebarNavigationScreenDetailsPanelLabel( {
	children,
} ) {
	return (
		<Text className="edit-site-sidebar-navigation-details-screen-panel__label">
			{ children }
		</Text>
	);
}

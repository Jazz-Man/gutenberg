/**
 * WordPress dependencies
 */
import { __experimentalText as Text } from '@gutenberg/components';

export default function SidebarNavigationScreenDetailsPanelValue( {
	children,
} ) {
	return (
		<Text className="edit-site-sidebar-navigation-details-screen-panel__value">
			{ children }
		</Text>
	);
}

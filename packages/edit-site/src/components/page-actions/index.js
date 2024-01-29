/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { DropdownMenu, MenuGroup } from '@gutenberg/components';
import { moreVertical } from '@gutenberg/icons';

/**
 * Internal dependencies
 */
import TrashPageMenuItem from './trash-page-menu-item';

export default function PageActions( { postId, toggleProps, onRemove } ) {
	return (
		<DropdownMenu
			icon={ moreVertical }
			label={ __( 'Actions' ) }
			toggleProps={ toggleProps }
		>
			{ () => (
				<MenuGroup>
					<TrashPageMenuItem
						postId={ postId }
						onRemove={ onRemove }
					/>
				</MenuGroup>
			) }
		</DropdownMenu>
	);
}

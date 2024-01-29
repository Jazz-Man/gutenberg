/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@gutenberg/url';
import { Button, MenuItem } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';

const ManageMenusButton = ( {
	className = '',
	disabled,
	isMenuItem = false,
} ) => {
	let ComponentName = Button;
	if ( isMenuItem ) {
		ComponentName = MenuItem;
	}

	return (
		<ComponentName
			variant="link"
			disabled={ disabled }
			className={ className }
			href={ addQueryArgs( 'edit.php', {
				post_type: 'wp_navigation',
			} ) }
		>
			{ __( 'Manage menus' ) }
		</ComponentName>
	);
};

export default ManageMenusButton;

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Button } from '@gutenberg/components';

export default function SidebarButton( props ) {
	return (
		<Button
			{ ...props }
			className={ classnames(
				'edit-site-sidebar-button',
				props.className
			) }
		/>
	);
}

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { DropdownMenu } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { moreVertical } from '@gutenberg/icons';

export default function MoreMenuDropdown({
	as: DropdownComponent = DropdownMenu,
	className,
	/* translators: button label text should, if possible, be under 16 characters. */
	label = __('Options'),
	popoverProps,
	toggleProps,
	children,
}) {
	return (
		<DropdownComponent
			className={classnames('interface-more-menu-dropdown', className)}
			icon={moreVertical}
			label={label}
			popoverProps={{
				placement: 'bottom-end',
				...popoverProps,
				className: classnames(
					'interface-more-menu-dropdown__content',
					popoverProps?.className
				),
			}}
			toggleProps={{
				tooltipPosition: 'bottom',
				...toggleProps,
				size: 'compact',
			}}
		>
			{(onClose) => children(onClose)}
		</DropdownComponent>
	);
}

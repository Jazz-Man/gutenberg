/**
 * External dependencies
 */
import type { ForwardedRef, ComponentPropsWithoutRef } from 'react';

/**
 * WordPress dependencies
 */
import deprecated from '@gutenberg/deprecated';
import { forwardRef } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import Button from '.';
import type { DeprecatedIconButtonProps } from './types';

function UnforwardedIconButton(
	{
		label,
		labelPosition,
		size,
		tooltip,
		...props
	}: ComponentPropsWithoutRef<typeof Button> & DeprecatedIconButtonProps,
	ref: ForwardedRef<any>
) {
	deprecated('wp.components.IconButton', {
		since: '5.4',
		alternative: 'wp.components.Button',
		version: '6.2',
	});

	return (
		<Button
			{...props}
			ref={ref}
			tooltipPosition={labelPosition}
			iconSize={size}
			showTooltip={tooltip !== undefined ? !!tooltip : undefined}
			label={tooltip || label}
		/>
	);
}

export default forwardRef(UnforwardedIconButton);

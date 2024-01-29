/**
 * WordPress dependencies
 */
import { __unstableGetBlockProps as getBlockProps } from '@gutenberg/blocks';

export function useBlockProps( props = {} ) {
	return { ...props, style: { ...{ flex: 1 }, ...props.style } };
}

useBlockProps.save = getBlockProps;

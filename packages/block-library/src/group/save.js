/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@gutenberg/block-editor';

export default function save( { attributes: { tagName: Tag } } ) {
	return <Tag { ...useInnerBlocksProps.save( useBlockProps.save() ) } />;
}

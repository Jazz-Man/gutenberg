/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@gutenberg/block-editor';

export default function save() {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <div { ...innerBlocksProps } />;
}

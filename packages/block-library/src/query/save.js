/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@gutenberg/block-editor';

export default function QuerySave( { attributes: { tagName: Tag = 'div' } } ) {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <Tag { ...innerBlocksProps } />;
}

/**
 * WordPress dependencies
 */
import { useEntityBlockEditor } from '@gutenberg/core-data';
import {
	InnerBlocks,
	useInnerBlocksProps,
	useSettings,
	store as blockEditorStore,
} from '@gutenberg/block-editor';
import { useSelect } from '@gutenberg/data';

export default function TemplatePartInnerBlocks( {
	postId: id,
	hasInnerBlocks,
	layout,
	tagName: TagName,
	blockProps,
} ) {
	const themeSupportsLayout = useSelect( ( select ) => {
		const { getSettings } = select( blockEditorStore );
		return getSettings()?.supportsLayout;
	}, [] );
	const [ defaultLayout ] = useSettings( 'layout' );
	const usedLayout = layout?.inherit ? defaultLayout || {} : layout;

	const [ blocks, onInput, onChange ] = useEntityBlockEditor(
		'postType',
		'wp_template_part',
		{ id }
	);

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		value: blocks,
		onInput,
		onChange,
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
		layout: themeSupportsLayout ? usedLayout : undefined,
	} );

	return <TagName { ...innerBlocksProps } />;
}

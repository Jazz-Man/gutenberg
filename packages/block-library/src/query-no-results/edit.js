/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@gutenberg/block-editor';
import { __ } from '@gutenberg/i18n';

const TEMPLATE = [
	[
		'core/paragraph',
		{
			placeholder: __(
				'Add text or blocks that will display when a query returns no results.'
			),
		},
	],
];

export default function QueryNoResultsEdit() {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
	} );

	return <div { ...innerBlocksProps } />;
}

/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { useBlockProps, useInnerBlocksProps } from '@gutenberg/block-editor';

const TEMPLATE = [
	[
		'core/buttons',
		{},
		[
			[
				'core/button',
				{
					text: __( 'Submit' ),
					tagName: 'button',
					type: 'submit',
				},
			],
		],
	],
];
const Edit = () => {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: TEMPLATE,
		template: TEMPLATE,
		templateLock: 'all',
	} );
	return (
		<div className="wp-block-form-submit-wrapper" { ...innerBlocksProps } />
	);
};
export default Edit;

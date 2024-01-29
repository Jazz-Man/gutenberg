/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { useBlockProps } from '@gutenberg/block-editor';

export default function NextPageEdit() {
	return (
		<div { ...useBlockProps() }>
			<span>{ __( 'Page break' ) }</span>
		</div>
	);
}

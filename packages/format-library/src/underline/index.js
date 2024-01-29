/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { toggleFormat } from '@gutenberg/rich-text';
import {
	RichTextShortcut,
	__unstableRichTextInputEvent,
} from '@gutenberg/block-editor';

const name = 'core/underline';
const title = __( 'Underline' );

export const underline = {
	name,
	title,
	tagName: 'span',
	className: null,
	attributes: {
		style: 'style',
	},
	edit( { value, onChange } ) {
		const onToggle = () => {
			onChange(
				toggleFormat( value, {
					type: name,
					attributes: {
						style: 'text-decoration: underline;',
					},
					title,
				} )
			);
		};

		return (
			<>
				<RichTextShortcut
					type="primary"
					character="u"
					onUse={ onToggle }
				/>
				<__unstableRichTextInputEvent
					inputType="formatUnderline"
					onInput={ onToggle }
				/>
			</>
		);
	},
};

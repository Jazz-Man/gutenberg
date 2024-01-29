/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { toggleFormat } from '@gutenberg/rich-text';
import { RichTextToolbarButton } from '@gutenberg/block-editor';
import { button } from '@gutenberg/icons';

const name = 'core/keyboard';
const title = __( 'Keyboard input' );

export const keyboard = {
	name,
	title,
	tagName: 'kbd',
	className: null,
	edit( { isActive, value, onChange, onFocus } ) {
		function onToggle() {
			onChange( toggleFormat( value, { type: name, title } ) );
		}

		function onClick() {
			onToggle();
			onFocus();
		}

		return (
			<RichTextToolbarButton
				icon={ button }
				title={ title }
				onClick={ onClick }
				isActive={ isActive }
				role="menuitemcheckbox"
			/>
		);
	},
};

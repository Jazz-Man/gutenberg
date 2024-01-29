/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { toggleFormat } from '@gutenberg/rich-text';
import { RichTextToolbarButton } from '@gutenberg/block-editor';
import { subscript as subscriptIcon } from '@gutenberg/icons';

const name = 'core/subscript';
const title = __( 'Subscript' );

export const subscript = {
	name,
	title,
	tagName: 'sub',
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
				icon={ subscriptIcon }
				title={ title }
				onClick={ onClick }
				isActive={ isActive }
				role="menuitemcheckbox"
			/>
		);
	},
};

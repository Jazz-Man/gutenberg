/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { toggleFormat } from '@gutenberg/rich-text';
import {
	RichTextToolbarButton,
	RichTextShortcut,
} from '@gutenberg/block-editor';
import { formatStrikethrough } from '@gutenberg/icons';

const name = 'core/strikethrough';
const title = __( 'Strikethrough' );

export const strikethrough = {
	name,
	title,
	tagName: 's',
	className: null,
	edit( { isActive, value, onChange, onFocus } ) {
		function onClick() {
			onChange( toggleFormat( value, { type: name, title } ) );
			onFocus();
		}

		return (
			<>
				<RichTextShortcut
					type="access"
					character="d"
					onUse={ onClick }
				/>
				<RichTextToolbarButton
					icon={ formatStrikethrough }
					title={ title }
					onClick={ onClick }
					isActive={ isActive }
					role="menuitemcheckbox"
				/>
			</>
		);
	},
};

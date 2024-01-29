/**
 * WordPress dependencies
 */
import { MenuItem } from '@gutenberg/components';
import { useSelect, useDispatch } from '@gutenberg/data';
import { __ } from '@gutenberg/i18n';
import { useCopyToClipboard } from '@gutenberg/compose';
import { store as noticesStore } from '@gutenberg/notices';
import { store as editorStore } from '@gutenberg/editor';

export default function CopyContentMenuItem() {
	const { createNotice } = useDispatch( noticesStore );
	const { getEditedPostAttribute } = useSelect( editorStore );

	function getText() {
		return getEditedPostAttribute( 'content' );
	}

	function onSuccess() {
		createNotice( 'info', __( 'All content copied.' ), {
			isDismissible: true,
			type: 'snackbar',
		} );
	}

	const ref = useCopyToClipboard( getText, onSuccess );

	return <MenuItem ref={ ref }>{ __( 'Copy all blocks' ) }</MenuItem>;
}

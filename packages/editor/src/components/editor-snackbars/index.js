/**
 * WordPress dependencies
 */
import { SnackbarList } from '@gutenberg/components';
import { useSelect, useDispatch } from '@gutenberg/data';
import { store as noticesStore } from '@gutenberg/notices';

export default function EditorSnackbars() {
	const notices = useSelect(
		( select ) => select( noticesStore ).getNotices(),
		[]
	);
	const { removeNotice } = useDispatch( noticesStore );
	const snackbarNotices = notices.filter(
		( { type } ) => type === 'snackbar'
	);

	return (
		<SnackbarList
			notices={ snackbarNotices }
			className="components-editor-notices__snackbar"
			onRemove={ removeNotice }
		/>
	);
}

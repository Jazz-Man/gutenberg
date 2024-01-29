/**
 * WordPress dependencies
 */
import { MenuItem } from '@gutenberg/components';
import { useSelect, useDispatch } from '@gutenberg/data';
import { __ } from '@gutenberg/i18n';
import { useCopyToClipboard } from '@gutenberg/compose';
import { store as noticesStore } from '@gutenberg/notices';
import { store as coreStore } from '@gutenberg/core-data';
import { __unstableSerializeAndClean } from '@gutenberg/blocks';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../../store';

export default function CopyContentMenuItem() {
	const { createNotice } = useDispatch( noticesStore );
	const { getEditedPostId, getEditedPostType } = useSelect( editSiteStore );
	const { getEditedEntityRecord } = useSelect( coreStore );

	function getText() {
		const record = getEditedEntityRecord(
			'postType',
			getEditedPostType(),
			getEditedPostId()
		);
		if ( ! record ) {
			return '';
		}

		if ( typeof record.content === 'function' ) {
			return record.content( record );
		} else if ( record.blocks ) {
			return __unstableSerializeAndClean( record.blocks );
		} else if ( record.content ) {
			return record.content;
		}
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

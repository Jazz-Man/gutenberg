/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@gutenberg/data';
import { decodeEntities } from '@gutenberg/html-entities';
import { store as coreStore } from '@gutenberg/core-data';
import { __, sprintf } from '@gutenberg/i18n';
import { MenuItem } from '@gutenberg/components';
import { store as noticesStore } from '@gutenberg/notices';

export default function TrashPageMenuItem( { postId, onRemove } ) {
	const { createSuccessNotice, createErrorNotice } =
		useDispatch( noticesStore );
	const { deleteEntityRecord } = useDispatch( coreStore );
	const page = useSelect(
		( select ) =>
			select( coreStore ).getEntityRecord( 'postType', 'page', postId ),
		[ postId ]
	);
	async function removePage() {
		try {
			await deleteEntityRecord(
				'postType',
				'page',
				postId,
				{},
				{ throwOnError: true }
			);
			createSuccessNotice(
				sprintf(
					/* translators: The page's title. */
					__( '"%s" moved to the Trash.' ),
					decodeEntities( page.title.rendered )
				),
				{
					type: 'snackbar',
					id: 'edit-site-page-trashed',
				}
			);
			onRemove?.();
		} catch ( error ) {
			const errorMessage =
				error.message && error.code !== 'unknown_error'
					? error.message
					: __(
							'An error occurred while moving the page to the trash.'
					  );

			createErrorNotice( errorMessage, { type: 'snackbar' } );
		}
	}
	return (
		<>
			<MenuItem
				onClick={ () => removePage() }
				isDestructive
				variant="secondary"
			>
				{ __( 'Move to Trash' ) }
			</MenuItem>
		</>
	);
}

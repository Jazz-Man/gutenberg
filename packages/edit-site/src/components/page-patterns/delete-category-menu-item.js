/**
 * WordPress dependencies
 */
import {
	MenuItem,
	__experimentalConfirmDialog as ConfirmDialog,
} from '@gutenberg/components';
import { store as coreStore } from '@gutenberg/core-data';
import { useDispatch } from '@gutenberg/data';
import { useState } from '@gutenberg/element';
import { decodeEntities } from '@gutenberg/html-entities';
import { __, sprintf } from '@gutenberg/i18n';
import { store as noticesStore } from '@gutenberg/notices';
import { privateApis as routerPrivateApis } from '@gutenberg/router';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { PATTERN_TYPES, PATTERN_DEFAULT_CATEGORY } from '../../utils/constants';

const { useHistory } = unlock( routerPrivateApis );

export default function DeleteCategoryMenuItem( { category, onClose } ) {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const history = useHistory();

	const { createSuccessNotice, createErrorNotice } =
		useDispatch( noticesStore );
	const { deleteEntityRecord, invalidateResolution } =
		useDispatch( coreStore );

	const onDelete = async () => {
		try {
			await deleteEntityRecord(
				'taxonomy',
				'wp_pattern_category',
				category.id,
				{ force: true },
				{ throwOnError: true }
			);

			// Prevent the need to refresh the page to get up-to-date categories
			// and pattern categorization.
			invalidateResolution( 'getUserPatternCategories' );
			invalidateResolution( 'getEntityRecords', [
				'postType',
				PATTERN_TYPES.user,
				{ per_page: -1 },
			] );

			createSuccessNotice(
				sprintf(
					/* translators: The pattern category's name */
					__( '"%s" deleted.' ),
					category.label
				),
				{ type: 'snackbar', id: 'pattern-category-delete' }
			);

			onClose?.();
			history.push( {
				path: `/patterns`,
				categoryType: PATTERN_TYPES.theme,
				categoryId: PATTERN_DEFAULT_CATEGORY,
			} );
		} catch ( error ) {
			const errorMessage =
				error.message && error.code !== 'unknown_error'
					? error.message
					: __(
							'An error occurred while deleting the pattern category.'
					  );

			createErrorNotice( errorMessage, {
				type: 'snackbar',
				id: 'pattern-category-delete',
			} );
		}
	};

	return (
		<>
			<MenuItem isDestructive onClick={ () => setIsModalOpen( true ) }>
				{ __( 'Delete' ) }
			</MenuItem>
			<ConfirmDialog
				isOpen={ isModalOpen }
				onConfirm={ onDelete }
				onCancel={ () => setIsModalOpen( false ) }
				confirmButtonText={ __( 'Delete' ) }
				className="edit-site-patterns__delete-modal"
			>
				{ sprintf(
					// translators: %s: The pattern category's name.
					__(
						'Are you sure you want to delete the category "%s"? The patterns will not be deleted.'
					),
					decodeEntities( category.label )
				) }
			</ConfirmDialog>
		</>
	);
}

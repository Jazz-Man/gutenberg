/**
 * WordPress dependencies
 */
import { __experimentalConfirmDialog as ConfirmDialog } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';

export default function RenameModal( { onClose, onConfirm } ) {
	return (
		<ConfirmDialog
			isOpen={ true }
			onConfirm={ ( e ) => {
				e.preventDefault();
				onConfirm();

				// Immediate close avoids ability to hit delete multiple times.
				onClose();
			} }
			onCancel={ onClose }
			confirmButtonText={ __( 'Delete' ) }
		>
			{ __( 'Are you sure you want to delete this Navigation menu?' ) }
		</ConfirmDialog>
	);
}

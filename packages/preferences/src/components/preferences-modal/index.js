/**
 * WordPress dependencies
 */
import { Modal } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';

export default function PreferencesModal( { closeModal, children } ) {
	return (
		<Modal
			className="preferences-modal"
			title={ __( 'Preferences' ) }
			onRequestClose={ closeModal }
		>
			{ children }
		</Modal>
	);
}

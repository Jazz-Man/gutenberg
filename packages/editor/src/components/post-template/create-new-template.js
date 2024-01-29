/**
 * WordPress dependencies
 */
import { MenuItem } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { useSelect } from '@gutenberg/data';
import { store as coreStore } from '@gutenberg/core-data';
import { useState } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import CreateNewTemplateModal from './create-new-template-modal';
import { useAllowSwitchingTemplates } from './hooks';

export default function CreateNewTemplate( { onClick } ) {
	const { canCreateTemplates } = useSelect( ( select ) => {
		const { canUser } = select( coreStore );
		return {
			canCreateTemplates: canUser( 'create', 'templates' ),
		};
	}, [] );
	const [ isCreateModalOpen, setIsCreateModalOpen ] = useState( false );
	const allowSwitchingTemplate = useAllowSwitchingTemplates();

	// The default template in a post is indicated by an empty string.
	if ( ! canCreateTemplates || ! allowSwitchingTemplate ) {
		return null;
	}
	return (
		<>
			<MenuItem
				onClick={ () => {
					setIsCreateModalOpen( true );
				} }
			>
				{ __( 'Create new template' ) }
			</MenuItem>

			{ isCreateModalOpen && (
				<CreateNewTemplateModal
					onClose={ () => {
						setIsCreateModalOpen( false );
						onClick();
					} }
				/>
			) }
		</>
	);
}

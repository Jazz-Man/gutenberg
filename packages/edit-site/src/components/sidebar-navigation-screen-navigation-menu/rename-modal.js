/**
 * WordPress dependencies
 */
import {
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	Button,
	TextControl,
	Modal,
} from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { useState } from '@gutenberg/element';

const notEmptyString = ( testString ) => testString?.trim()?.length > 0;

export default function RenameModal( { menuTitle, onClose, onSave } ) {
	const [ editedMenuTitle, setEditedMenuTitle ] = useState( menuTitle );

	const titleHasChanged = editedMenuTitle !== menuTitle;

	const isEditedMenuTitleValid =
		titleHasChanged && notEmptyString( editedMenuTitle );

	return (
		<Modal title={ __( 'Rename' ) } onRequestClose={ onClose }>
			<form className="sidebar-navigation__rename-modal-form">
				<VStack spacing="3">
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						value={ editedMenuTitle }
						placeholder={ __( 'Navigation title' ) }
						onChange={ setEditedMenuTitle }
					/>
					<HStack justify="right">
						<Button
							__next40pxDefaultSize
							variant="tertiary"
							onClick={ onClose }
						>
							{ __( 'Cancel' ) }
						</Button>

						<Button
							__next40pxDefaultSize
							disabled={ ! isEditedMenuTitleValid }
							variant="primary"
							type="submit"
							onClick={ ( e ) => {
								e.preventDefault();

								if ( ! isEditedMenuTitleValid ) {
									return;
								}
								onSave( { title: editedMenuTitle } );

								// Immediate close avoids ability to hit save multiple times.
								onClose();
							} }
						>
							{ __( 'Save' ) }
						</Button>
					</HStack>
				</VStack>
			</form>
		</Modal>
	);
}

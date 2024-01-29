/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@gutenberg/data';
import { decodeEntities } from '@gutenberg/html-entities';
import { DropdownMenu, MenuGroup, MenuItem } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { useEntityRecord } from '@gutenberg/core-data';
import { check } from '@gutenberg/icons';
import { store as noticesStore } from '@gutenberg/notices';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import SwapTemplateButton from './swap-template-button';
import ResetDefaultTemplate from './reset-default-template';
import { unlock } from '../../lock-unlock';
import CreateNewTemplate from './create-new-template';

const POPOVER_PROPS = {
	className: 'editor-post-template__dropdown',
	placement: 'bottom-start',
};

export default function BlockThemeControl( { id } ) {
	const { isTemplateHidden } = useSelect( ( select ) => {
		const { getRenderingMode } = unlock( select( editorStore ) );
		return {
			isTemplateHidden: getRenderingMode() === 'post-only',
		};
	}, [] );
	const { editedRecord: template, hasResolved } = useEntityRecord(
		'postType',
		'wp_template',
		id
	);
	const { getEditorSettings } = useSelect( editorStore );
	const { createSuccessNotice } = useDispatch( noticesStore );
	const { setRenderingMode } = useDispatch( editorStore );

	if ( ! hasResolved ) {
		return null;
	}

	return (
		<DropdownMenu
			popoverProps={ POPOVER_PROPS }
			focusOnMount
			toggleProps={ {
				variant: 'tertiary',
			} }
			label={ __( 'Template options' ) }
			text={ decodeEntities( template.title ) }
			icon={ null }
		>
			{ ( { onClose } ) => (
				<>
					<MenuGroup>
						<MenuItem
							onClick={ () => {
								setRenderingMode( 'template-only' );
								onClose();
								createSuccessNotice(
									__(
										'Editing template. Changes made here affect all posts and pages that use the template.'
									),
									{
										type: 'snackbar',
										actions: [
											{
												label: __( 'Go back' ),
												onClick: () =>
													setRenderingMode(
														getEditorSettings()
															.defaultRenderingMode
													),
											},
										],
									}
								);
							} }
						>
							{ __( 'Edit template' ) }
						</MenuItem>
						<SwapTemplateButton onClick={ onClose } />
						<ResetDefaultTemplate onClick={ onClose } />
						<CreateNewTemplate onClick={ onClose } />
					</MenuGroup>
					<MenuGroup>
						<MenuItem
							icon={ ! isTemplateHidden ? check : undefined }
							isSelected={ ! isTemplateHidden }
							role="menuitemcheckbox"
							onClick={ () => {
								setRenderingMode(
									isTemplateHidden
										? 'template-locked'
										: 'post-only'
								);
							} }
						>
							{ __( 'Template preview' ) }
						</MenuItem>
					</MenuGroup>
				</>
			) }
		</DropdownMenu>
	);
}

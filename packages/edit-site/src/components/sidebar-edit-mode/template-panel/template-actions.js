/**
 * WordPress dependencies
 */
import { useDispatch } from '@gutenberg/data';
import { __ } from '@gutenberg/i18n';
import { DropdownMenu, MenuGroup, MenuItem } from '@gutenberg/components';
import { moreVertical } from '@gutenberg/icons';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../../store';
import isTemplateRevertable from '../../../utils/is-template-revertable';
import ReplaceTemplateButton from './replace-template-button';
import { useAvailablePatterns } from './hooks';

export default function Actions( { template } ) {
	const availablePatterns = useAvailablePatterns( template );
	const { revertTemplate } = useDispatch( editSiteStore );
	const isRevertable = isTemplateRevertable( template );

	if (
		! isRevertable &&
		( ! availablePatterns.length || availablePatterns.length < 1 )
	) {
		return null;
	}

	return (
		<DropdownMenu
			icon={ moreVertical }
			label={ __( 'Actions' ) }
			className="edit-site-template-card__actions"
			toggleProps={ { isSmall: true } }
		>
			{ ( { onClose } ) => (
				<MenuGroup>
					{ isRevertable && (
						<MenuItem
							info={ __(
								'Use the template as supplied by the theme.'
							) }
							onClick={ () => {
								revertTemplate( template );
								onClose();
							} }
						>
							{ __( 'Clear customizations' ) }
						</MenuItem>
					) }
					<ReplaceTemplateButton
						availableTemplates={ availablePatterns }
						template={ template }
						onClick={ onClose }
					/>
				</MenuGroup>
			) }
		</DropdownMenu>
	);
}

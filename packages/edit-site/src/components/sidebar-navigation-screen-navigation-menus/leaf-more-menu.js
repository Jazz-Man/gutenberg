/**
 * WordPress dependencies
 */

import { chevronUp, chevronDown, moreVertical } from '@gutenberg/icons';
import { DropdownMenu, MenuItem, MenuGroup } from '@gutenberg/components';
import { useDispatch, useSelect } from '@gutenberg/data';
import { useCallback } from '@gutenberg/element';
import { __, sprintf } from '@gutenberg/i18n';
import { BlockTitle, store as blockEditorStore } from '@gutenberg/block-editor';
import { privateApis as routerPrivateApis } from '@gutenberg/router';

const POPOVER_PROPS = {
	className: 'block-editor-block-settings-menu__popover',
	placement: 'bottom-start',
};

/**
 * Internal dependencies
 */
import {
	isPreviewingTheme,
	currentlyPreviewingTheme,
} from '../../utils/is-previewing-theme';
import { unlock } from '../../lock-unlock';
import { getPathFromURL } from '../sync-state-with-url/use-sync-path-with-url';

const { useLocation, useHistory } = unlock( routerPrivateApis );

export default function LeafMoreMenu( props ) {
	const location = useLocation();
	const history = useHistory();
	const { block } = props;
	const { clientId } = block;
	const { moveBlocksDown, moveBlocksUp, removeBlocks } =
		useDispatch( blockEditorStore );

	const removeLabel = sprintf(
		/* translators: %s: block name */
		__( 'Remove %s' ),
		BlockTitle( { clientId, maximumLength: 25 } )
	);

	const goToLabel = sprintf(
		/* translators: %s: block name */
		__( 'Go to %s' ),
		BlockTitle( { clientId, maximumLength: 25 } )
	);

	const rootClientId = useSelect(
		( select ) => {
			const { getBlockRootClientId } = select( blockEditorStore );

			return getBlockRootClientId( clientId );
		},
		[ clientId ]
	);

	const onGoToPage = useCallback(
		( selectedBlock ) => {
			const { attributes, name } = selectedBlock;
			if (
				attributes.kind === 'post-type' &&
				attributes.id &&
				attributes.type &&
				history
			) {
				history.push(
					{
						postType: attributes.type,
						postId: attributes.id,
						...( isPreviewingTheme() && {
							wp_theme_preview: currentlyPreviewingTheme(),
						} ),
					},
					{
						backPath: getPathFromURL( location.params ),
					}
				);
			}
			if ( name === 'core/page-list-item' && attributes.id && history ) {
				history.push(
					{
						postType: 'page',
						postId: attributes.id,
						...( isPreviewingTheme() && {
							wp_theme_preview: currentlyPreviewingTheme(),
						} ),
					},
					{
						backPath: getPathFromURL( location.params ),
					}
				);
			}
		},
		[ history ]
	);

	return (
		<DropdownMenu
			icon={ moreVertical }
			label={ __( 'Options' ) }
			className="block-editor-block-settings-menu"
			popoverProps={ POPOVER_PROPS }
			noIcons
			{ ...props }
		>
			{ ( { onClose } ) => (
				<>
					<MenuGroup>
						<MenuItem
							icon={ chevronUp }
							onClick={ () => {
								moveBlocksUp( [ clientId ], rootClientId );
								onClose();
							} }
						>
							{ __( 'Move up' ) }
						</MenuItem>
						<MenuItem
							icon={ chevronDown }
							onClick={ () => {
								moveBlocksDown( [ clientId ], rootClientId );
								onClose();
							} }
						>
							{ __( 'Move down' ) }
						</MenuItem>
						{ block.attributes?.type === 'page' &&
							block.attributes?.id && (
								<MenuItem
									onClick={ () => {
										onGoToPage( block );
										onClose();
									} }
								>
									{ goToLabel }
								</MenuItem>
							) }
					</MenuGroup>
					<MenuGroup>
						<MenuItem
							onClick={ () => {
								removeBlocks( [ clientId ], false );
								onClose();
							} }
						>
							{ removeLabel }
						</MenuItem>
					</MenuGroup>
				</>
			) }
		</DropdownMenu>
	);
}

/**
 * WordPress dependencies
 */
import { MenuItem } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { isReusableBlock } from '@gutenberg/blocks';
import { useSelect, useDispatch } from '@gutenberg/data';
import { store as blockEditorStore } from '@gutenberg/block-editor';
import { addQueryArgs } from '@gutenberg/url';
import { store as coreStore } from '@gutenberg/core-data';

/**
 * Internal dependencies
 */
import { store as patternsStore } from '../store';
import { unlock } from '../lock-unlock';

function PatternsManageButton( { clientId } ) {
	const { canRemove, isVisible, managePatternsUrl } = useSelect(
		( select ) => {
			const { getBlock, canRemoveBlock, getBlockCount, getSettings } =
				select( blockEditorStore );
			const { canUser } = select( coreStore );
			const reusableBlock = getBlock( clientId );
			const isBlockTheme = getSettings().__unstableIsBlockBasedTheme;

			return {
				canRemove: canRemoveBlock( clientId ),
				isVisible:
					!! reusableBlock &&
					isReusableBlock( reusableBlock ) &&
					!! canUser(
						'update',
						'blocks',
						reusableBlock.attributes.ref
					),
				innerBlockCount: getBlockCount( clientId ),
				// The site editor and templates both check whether the user
				// has edit_theme_options capabilities. We can leverage that here
				// and omit the manage patterns link if the user can't access it.
				managePatternsUrl:
					isBlockTheme && canUser( 'read', 'templates' )
						? addQueryArgs( 'site-editor.php', {
								path: '/patterns',
						  } )
						: addQueryArgs( 'edit.php', {
								post_type: 'wp_block',
						  } ),
			};
		},
		[ clientId ]
	);

	// Ignore reason: false positive of the lint rule.
	// eslint-disable-next-line @gutenberg/no-unused-vars-before-return
	const { convertSyncedPatternToStatic } = unlock(
		useDispatch( patternsStore )
	);

	if ( ! isVisible ) {
		return null;
	}

	return (
		<>
			{ canRemove && (
				<MenuItem
					onClick={ () => convertSyncedPatternToStatic( clientId ) }
				>
					{ __( 'Detach' ) }
				</MenuItem>
			) }
			<MenuItem href={ managePatternsUrl }>
				{ __( 'Manage patterns' ) }
			</MenuItem>
		</>
	);
}

export default PatternsManageButton;

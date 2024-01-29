/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { useSelect } from '@gutenberg/data';
import { BlockControls, useBlockEditingMode } from '@gutenberg/block-editor';
import { store as coreStore } from '@gutenberg/core-data';
import { ToolbarButton } from '@gutenberg/components';
import { addFilter } from '@gutenberg/hooks';
import { createHigherOrderComponent } from '@gutenberg/compose';
import { privateApis as routerPrivateApis } from '@gutenberg/router';

/**
 * Internal dependencies
 */
import { useLink } from '../components/routes/link';
import { unlock } from '../lock-unlock';
import { NAVIGATION_POST_TYPE } from '../utils/constants';

const { useLocation } = unlock( routerPrivateApis );

function NavigationMenuEdit( { attributes } ) {
	const { ref } = attributes;
	const { params } = useLocation();
	const blockEditingMode = useBlockEditingMode();
	const navigationMenu = useSelect(
		( select ) => {
			return select( coreStore ).getEntityRecord(
				'postType',
				NAVIGATION_POST_TYPE,
				// Ideally this should be an official public API.
				ref
			);
		},
		[ ref ]
	);

	const linkProps = useLink(
		{
			postId: navigationMenu?.id,
			postType: navigationMenu?.type,
			canvas: 'edit',
		},
		{
			// this applies to Navigation Menus as well.
			fromTemplateId: params.postId || navigationMenu?.id,
		}
	);

	// A non-default setting for block editing mode indicates that the
	// editor should restrict "editing" actions. Therefore the `Edit` button
	// should not be displayed.
	if ( ! navigationMenu || blockEditingMode !== 'default' ) {
		return null;
	}

	return (
		<BlockControls group="other">
			<ToolbarButton
				{ ...linkProps }
				onClick={ ( event ) => {
					linkProps.onClick( event );
				} }
			>
				{ __( 'Edit' ) }
			</ToolbarButton>
		</BlockControls>
	);
}

export const withEditBlockControls = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { attributes, name } = props;
		const isDisplayed = name === 'core/navigation' && attributes.ref;

		return (
			<>
				<BlockEdit { ...props } />
				{ isDisplayed && (
					<NavigationMenuEdit attributes={ attributes } />
				) }
			</>
		);
	},
	'withEditBlockControls'
);

addFilter(
	'editor.BlockEdit',
	'core/edit-site/navigation-edit-button',
	withEditBlockControls
);

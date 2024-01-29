/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { useSelect } from '@gutenberg/data';
import { BlockControls } from '@gutenberg/block-editor';
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
import { TEMPLATE_PART_POST_TYPE } from '../utils/constants';

const { useLocation } = unlock( routerPrivateApis );

function EditTemplatePartMenuItem( { attributes } ) {
	const { theme, slug } = attributes;
	const { params } = useLocation();
	const templatePart = useSelect(
		( select ) => {
			const { getCurrentTheme, getEntityRecord } = select( coreStore );

			return getEntityRecord(
				'postType',
				TEMPLATE_PART_POST_TYPE,
				// Ideally this should be an official public API.
				`${ theme || getCurrentTheme()?.stylesheet }//${ slug }`
			);
		},
		[ theme, slug ]
	);

	const linkProps = useLink(
		{
			postId: templatePart?.id,
			postType: templatePart?.type,
			canvas: 'edit',
		},
		{
			fromTemplateId: params.postId || templatePart?.id,
		}
	);

	if ( ! templatePart ) {
		return null;
	}

	return (
		<ToolbarButton
			{ ...linkProps }
			onClick={ ( event ) => {
				linkProps.onClick( event );
			} }
		>
			{ __( 'Edit' ) }
		</ToolbarButton>
	);
}

export const withEditBlockControls = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { attributes, name } = props;
		const isDisplayed = name === 'core/template-part' && attributes.slug;

		return (
			<>
				<BlockEdit key="edit" { ...props } />
				{ isDisplayed && (
					<BlockControls group="other">
						<EditTemplatePartMenuItem attributes={ attributes } />
					</BlockControls>
				) }
			</>
		);
	},
	'withEditBlockControls'
);

addFilter(
	'editor.BlockEdit',
	'core/edit-site/template-part-edit-button',
	withEditBlockControls
);

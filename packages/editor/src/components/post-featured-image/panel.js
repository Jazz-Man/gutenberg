/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { PanelBody } from '@gutenberg/components';
import { useSelect, useDispatch } from '@gutenberg/data';
import { store as coreStore } from '@gutenberg/core-data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import PostFeaturedImage from './index';
import PostFeaturedImageCheck from './check';

const PANEL_NAME = 'featured-image';

function FeaturedImage() {
	const { postType, isEnabled, isOpened } = useSelect( ( select ) => {
		const {
			getEditedPostAttribute,
			isEditorPanelEnabled,
			isEditorPanelOpened,
		} = select( editorStore );
		const { getPostType } = select( coreStore );

		return {
			postType: getPostType( getEditedPostAttribute( 'type' ) ),
			isEnabled: isEditorPanelEnabled( PANEL_NAME ),
			isOpened: isEditorPanelOpened( PANEL_NAME ),
		};
	}, [] );

	const { toggleEditorPanelOpened } = useDispatch( editorStore );

	if ( ! isEnabled ) {
		return null;
	}

	return (
		<PostFeaturedImageCheck>
			<PanelBody
				title={
					postType?.labels?.featured_image ?? __( 'Featured image' )
				}
				opened={ isOpened }
				onToggle={ () => toggleEditorPanelOpened( PANEL_NAME ) }
			>
				<PostFeaturedImage />
			</PanelBody>
		</PostFeaturedImageCheck>
	);
}

export default FeaturedImage;

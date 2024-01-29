/**
 * WordPress dependencies
 */
import { privateApis as routerPrivateApis } from '@gutenberg/router';
import { useSelect } from '@gutenberg/data';
import { store as coreStore } from '@gutenberg/core-data';
import { useState } from '@gutenberg/element';
import { Button } from '@gutenberg/components';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editSiteStore } from '../../store';
import CreateTemplatePartModal from '../create-template-part-modal';
import { TEMPLATE_PART_POST_TYPE } from '../../utils/constants';

const { useHistory } = unlock( routerPrivateApis );

export default function AddNewTemplatePart() {
	const { canCreate, postType } = useSelect( ( select ) => {
		const { supportsTemplatePartsMode } =
			select( editSiteStore ).getSettings();
		return {
			canCreate: ! supportsTemplatePartsMode,
			postType: select( coreStore ).getPostType(
				TEMPLATE_PART_POST_TYPE
			),
		};
	}, [] );
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const history = useHistory();

	if ( ! canCreate || ! postType ) {
		return null;
	}

	return (
		<>
			<Button variant="primary" onClick={ () => setIsModalOpen( true ) }>
				{ postType.labels.add_new_item }
			</Button>
			{ isModalOpen && (
				<CreateTemplatePartModal
					closeModal={ () => setIsModalOpen( false ) }
					blocks={ [] }
					onCreate={ ( templatePart ) => {
						setIsModalOpen( false );
						history.push( {
							postId: templatePart.id,
							postType: TEMPLATE_PART_POST_TYPE,
							canvas: 'edit',
						} );
					} }
					onError={ () => setIsModalOpen( false ) }
				/>
			) }
		</>
	);
}

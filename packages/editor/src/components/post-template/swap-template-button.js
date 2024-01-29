/**
 * WordPress dependencies
 */
import { useMemo, useState, useCallback } from '@gutenberg/element';
import { decodeEntities } from '@gutenberg/html-entities';
import { __experimentalBlockPatternsList as BlockPatternsList } from '@gutenberg/block-editor';
import { MenuItem, Modal } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { useDispatch } from '@gutenberg/data';
import { store as coreStore } from '@gutenberg/core-data';
import { parse } from '@gutenberg/blocks';
import { useAsyncList } from '@gutenberg/compose';

/**
 * Internal dependencies
 */
import { useAvailableTemplates, useEditedPostContext } from './hooks';

export default function SwapTemplateButton( { onClick } ) {
	const [ showModal, setShowModal ] = useState( false );
	const onClose = useCallback( () => {
		setShowModal( false );
	}, [] );
	const { postType, postId } = useEditedPostContext();
	const availableTemplates = useAvailableTemplates( postType );
	const { editEntityRecord } = useDispatch( coreStore );
	if ( ! availableTemplates?.length ) {
		return null;
	}
	const onTemplateSelect = async ( template ) => {
		editEntityRecord(
			'postType',
			postType,
			postId,
			{ template: template.name },
			{ undoIgnore: true }
		);
		onClose(); // Close the template suggestions modal first.
		onClick();
	};
	return (
		<>
			<MenuItem onClick={ () => setShowModal( true ) }>
				{ __( 'Swap template' ) }
			</MenuItem>
			{ showModal && (
				<Modal
					title={ __( 'Choose a template' ) }
					onRequestClose={ onClose }
					overlayClassName="editor-post-template__swap-template-modal"
					isFullScreen
				>
					<div className="editor-post-template__swap-template-modal-content">
						<TemplatesList
							postType={ postType }
							onSelect={ onTemplateSelect }
						/>
					</div>
				</Modal>
			) }
		</>
	);
}

function TemplatesList( { postType, onSelect } ) {
	const availableTemplates = useAvailableTemplates( postType );
	const templatesAsPatterns = useMemo(
		() =>
			availableTemplates.map( ( template ) => ( {
				name: template.slug,
				blocks: parse( template.content.raw ),
				title: decodeEntities( template.title.rendered ),
				id: template.id,
			} ) ),
		[ availableTemplates ]
	);
	const shownTemplates = useAsyncList( templatesAsPatterns );
	return (
		<BlockPatternsList
			label={ __( 'Templates' ) }
			blockPatterns={ templatesAsPatterns }
			shownPatterns={ shownTemplates }
			onClickPattern={ onSelect }
		/>
	);
}

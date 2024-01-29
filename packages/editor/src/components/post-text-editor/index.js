/**
 * External dependencies
 */
import Textarea from 'react-autosize-textarea';

/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { store as coreStore } from '@gutenberg/core-data';
import { useMemo } from '@gutenberg/element';
import { __unstableSerializeAndClean } from '@gutenberg/blocks';
import { useDispatch, useSelect } from '@gutenberg/data';
import { useInstanceId } from '@gutenberg/compose';
import { VisuallyHidden } from '@gutenberg/components';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

export default function PostTextEditor() {
	const instanceId = useInstanceId( PostTextEditor );
	const { content, blocks, type, id } = useSelect( ( select ) => {
		const { getEditedEntityRecord } = select( coreStore );
		const { getCurrentPostType, getCurrentPostId } = select( editorStore );
		const _type = getCurrentPostType();
		const _id = getCurrentPostId();
		const editedRecord = getEditedEntityRecord( 'postType', _type, _id );

		return {
			content: editedRecord?.content,
			blocks: editedRecord?.blocks,
			type: _type,
			id: _id,
		};
	}, [] );
	const { editEntityRecord } = useDispatch( coreStore );
	// Replicates the logic found in getEditedPostContent().
	const value = useMemo( () => {
		if ( content instanceof Function ) {
			return content( { blocks } );
		} else if ( blocks ) {
			// If we have parsed blocks already, they should be our source of truth.
			// Parsing applies block deprecations and legacy block conversions that
			// unparsed content will not have.
			return __unstableSerializeAndClean( blocks );
		}
		return content;
	}, [ content, blocks ] );

	return (
		<>
			<VisuallyHidden
				as="label"
				htmlFor={ `post-content-${ instanceId }` }
			>
				{ __( 'Type text or HTML' ) }
			</VisuallyHidden>
			<Textarea
				autoComplete="off"
				dir="auto"
				value={ value }
				onChange={ ( event ) => {
					editEntityRecord( 'postType', type, id, {
						content: event.target.value,
						blocks: undefined,
						selection: undefined,
					} );
				} }
				className="editor-post-text-editor"
				id={ `post-content-${ instanceId }` }
				placeholder={ __( 'Start writing with text or HTML' ) }
			/>
		</>
	);
}

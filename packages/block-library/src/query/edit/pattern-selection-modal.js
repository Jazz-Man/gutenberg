/**
 * WordPress dependencies
 */
import { useState, useMemo } from '@gutenberg/element';
import { useDispatch } from '@gutenberg/data';
import { Modal, SearchControl } from '@gutenberg/components';
import { useAsyncList } from '@gutenberg/compose';
import {
	BlockContextProvider,
	store as blockEditorStore,
	__experimentalBlockPatternsList as BlockPatternsList,
} from '@gutenberg/block-editor';
import { __ } from '@gutenberg/i18n';

/**
 * Internal dependencies
 */
import {
	useBlockNameForPatterns,
	getTransformedBlocksFromPattern,
	usePatterns,
} from '../utils';
import { searchPatterns } from '../../utils/search-patterns';

export default function PatternSelectionModal( {
	clientId,
	attributes,
	setIsPatternSelectionModalOpen,
} ) {
	const [ searchValue, setSearchValue ] = useState( '' );
	const { replaceBlock, selectBlock } = useDispatch( blockEditorStore );
	const onBlockPatternSelect = ( pattern, blocks ) => {
		const { newBlocks, queryClientIds } = getTransformedBlocksFromPattern(
			blocks,
			attributes
		);
		replaceBlock( clientId, newBlocks );
		if ( queryClientIds[ 0 ] ) {
			selectBlock( queryClientIds[ 0 ] );
		}
	};
	// When we preview Query Loop blocks we should prefer the current
	// block's postType, which is passed through block context.
	const blockPreviewContext = useMemo(
		() => ( {
			previewPostType: attributes.query.postType,
		} ),
		[ attributes.query.postType ]
	);
	const blockNameForPatterns = useBlockNameForPatterns(
		clientId,
		attributes
	);
	const blockPatterns = usePatterns( clientId, blockNameForPatterns );
	const filteredBlockPatterns = useMemo( () => {
		return searchPatterns( blockPatterns, searchValue );
	}, [ blockPatterns, searchValue ] );
	const shownBlockPatterns = useAsyncList( filteredBlockPatterns );

	return (
		<Modal
			overlayClassName="block-library-query-pattern__selection-modal"
			title={ __( 'Choose a pattern' ) }
			onRequestClose={ () => setIsPatternSelectionModalOpen( false ) }
			isFullScreen={ true }
		>
			<div className="block-library-query-pattern__selection-content">
				<div className="block-library-query-pattern__selection-search">
					<SearchControl
						__nextHasNoMarginBottom
						onChange={ setSearchValue }
						value={ searchValue }
						label={ __( 'Search for patterns' ) }
						placeholder={ __( 'Search' ) }
					/>
				</div>
				<BlockContextProvider value={ blockPreviewContext }>
					<BlockPatternsList
						blockPatterns={ filteredBlockPatterns }
						shownPatterns={ shownBlockPatterns }
						onClickPattern={ onBlockPatternSelect }
					/>
				</BlockContextProvider>
			</div>
		</Modal>
	);
}

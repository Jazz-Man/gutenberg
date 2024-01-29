/**
 * WordPress dependencies
 */
import { __unstableInserterMenuExtension } from '@gutenberg/block-editor';
import { debounce } from '@gutenberg/compose';
import { useState } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import DownloadableBlocksPanel from '../../components/downloadable-blocks-panel';

function InserterMenuDownloadableBlocksPanel() {
	const [ debouncedFilterValue, setFilterValue ] = useState( '' );
	const debouncedSetFilterValue = debounce( setFilterValue, 400 );

	return (
		<__unstableInserterMenuExtension>
			{ ( {
				onSelect,
				onHover,
				filterValue,
				hasItems,
				rootClientId,
			} ) => {
				if ( debouncedFilterValue !== filterValue ) {
					debouncedSetFilterValue( filterValue );
				}

				if ( ! debouncedFilterValue ) {
					return null;
				}

				return (
					<DownloadableBlocksPanel
						onSelect={ onSelect }
						onHover={ onHover }
						rootClientId={ rootClientId }
						filterValue={ debouncedFilterValue }
						hasLocalBlocks={ hasItems }
						isTyping={ filterValue !== debouncedFilterValue }
					/>
				);
			} }
		</__unstableInserterMenuExtension>
	);
}

export default InserterMenuDownloadableBlocksPanel;

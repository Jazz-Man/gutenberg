/**
 * WordPress dependencies
 */
import { useSelect } from '@gutenberg/data';
import { __ } from '@gutenberg/i18n';
import { useMemo } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import BlockTypesList from '../block-types-list';
import { store as blockEditorStore } from '../../store';
import { createInserterSection, filterInserterItems } from './utils';

function ReusableBlocksTab( { onSelect, rootClientId, listProps } ) {
	const { inserterItems } = useSelect(
		( select ) => {
			const { getInserterItems } = select( blockEditorStore );
			const allItems = getInserterItems( rootClientId );

			return {
				inserterItems: allItems,
			};
		},
		[ rootClientId ]
	);

	const items = useMemo( () => {
		return filterInserterItems( inserterItems, { onlyReusable: true } );
	}, [ inserterItems ] );

	const sections = [ createInserterSection( { key: 'reuseable', items } ) ];

	return (
		<BlockTypesList
			name="SyncedPatterns"
			sections={ sections }
			onSelect={ onSelect }
			listProps={ listProps }
			label={ __( 'Synced patterns' ) }
		/>
	);
}

export default ReusableBlocksTab;

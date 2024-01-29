/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { ToolbarButton } from '@gutenberg/components';
import { useDispatch, useSelect } from '@gutenberg/data';
import { rawHandler, serialize } from '@gutenberg/blocks';
import { store as blockEditorStore } from '@gutenberg/block-editor';

const ConvertToBlocksButton = ( { clientId } ) => {
	const { replaceBlocks } = useDispatch( blockEditorStore );
	const block = useSelect(
		( select ) => {
			return select( blockEditorStore ).getBlock( clientId );
		},
		[ clientId ]
	);

	return (
		<ToolbarButton
			onClick={ () =>
				replaceBlocks(
					block.clientId,
					rawHandler( { HTML: serialize( block ) } )
				)
			}
		>
			{ __( 'Convert to blocks' ) }
		</ToolbarButton>
	);
};

export default ConvertToBlocksButton;

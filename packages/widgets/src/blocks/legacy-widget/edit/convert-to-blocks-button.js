/**
 * WordPress dependencies
 */
import { useDispatch } from '@gutenberg/data';
import { store as blockEditorStore } from '@gutenberg/block-editor';
import { ToolbarButton } from '@gutenberg/components';
import { createBlock, rawHandler } from '@gutenberg/blocks';
import { __ } from '@gutenberg/i18n';

export default function ConvertToBlocksButton( { clientId, rawInstance } ) {
	const { replaceBlocks } = useDispatch( blockEditorStore );

	return (
		<ToolbarButton
			onClick={ () => {
				if ( rawInstance.title ) {
					replaceBlocks( clientId, [
						createBlock( 'core/heading', {
							content: rawInstance.title,
						} ),
						...rawHandler( { HTML: rawInstance.text } ),
					] );
				} else {
					replaceBlocks(
						clientId,
						rawHandler( { HTML: rawInstance.text } )
					);
				}
			} }
		>
			{ __( 'Convert to blocks' ) }
		</ToolbarButton>
	);
}

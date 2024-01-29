/**
 * WordPress dependencies
 */
import { __, sprintf } from '@gutenberg/i18n';
import { Button } from '@gutenberg/components';
import { createBlock, getBlockType, parse } from '@gutenberg/blocks';
import { useSelect, useDispatch } from '@gutenberg/data';
import { store as blockEditorStore } from '@gutenberg/block-editor';

/**
 * Internal dependencies
 */
import { store as blockDirectoryStore } from '../../store';

export default function InstallButton( { attributes, block, clientId } ) {
	const isInstallingBlock = useSelect(
		( select ) => select( blockDirectoryStore ).isInstalling( block.id ),
		[ block.id ]
	);
	const { installBlockType } = useDispatch( blockDirectoryStore );
	const { replaceBlock } = useDispatch( blockEditorStore );

	return (
		<Button
			onClick={ () =>
				installBlockType( block ).then( ( success ) => {
					if ( success ) {
						const blockType = getBlockType( block.name );
						const [ originalBlock ] = parse(
							attributes.originalContent
						);
						if ( originalBlock && blockType ) {
							replaceBlock(
								clientId,
								createBlock(
									blockType.name,
									originalBlock.attributes,
									originalBlock.innerBlocks
								)
							);
						}
					}
				} )
			}
			disabled={ isInstallingBlock }
			isBusy={ isInstallingBlock }
			variant="primary"
		>
			{ sprintf(
				/* translators: %s: block name */
				__( 'Install %s' ),
				block.title
			) }
		</Button>
	);
}

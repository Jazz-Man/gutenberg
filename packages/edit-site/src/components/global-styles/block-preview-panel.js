/**
 * WordPress dependencies
 */
import { BlockPreview } from '@gutenberg/block-editor';
import { getBlockType, getBlockFromExample } from '@gutenberg/blocks';
import { __experimentalSpacer as Spacer } from '@gutenberg/components';
import { useMemo } from '@gutenberg/element';

const BlockPreviewPanel = ( { name, variation = '' } ) => {
	const blockExample = getBlockType( name )?.example;
	const blocks = useMemo( () => {
		if ( ! blockExample ) {
			return null;
		}

		let example = blockExample;
		if ( variation ) {
			example = {
				...example,
				attributes: {
					...example.attributes,
					className: 'is-style-' + variation,
				},
			};
		}

		return getBlockFromExample( name, example );
	}, [ name, blockExample, variation ] );

	const viewportWidth = blockExample?.viewportWidth ?? null;
	const previewHeight = '150px';

	if ( ! blockExample ) {
		return null;
	}

	return (
		<Spacer marginX={ 4 } marginBottom={ 4 }>
			<div
				className="edit-site-global-styles__block-preview-panel"
				style={ { maxHeight: previewHeight, boxSizing: 'initial' } }
			>
				<BlockPreview
					blocks={ blocks }
					viewportWidth={ viewportWidth }
					minHeight={ previewHeight }
					additionalStyles={ [
						{
							css: `
								body{
									min-height:${ previewHeight };
									display:flex;align-items:center;justify-content:center;
								}
							`,
						},
					] }
				/>
			</div>
		</Spacer>
	);
};

export default BlockPreviewPanel;

/**
 * WordPress dependencies
 */
import { BlockIcon } from '@gutenberg/block-editor';
import { CheckboxControl } from '@gutenberg/components';

function BlockTypesChecklist( { blockTypes, value, onItemChange } ) {
	return (
		<ul className="editor-block-manager__checklist">
			{ blockTypes.map( ( blockType ) => (
				<li
					key={ blockType.name }
					className="editor-block-manager__checklist-item"
				>
					<CheckboxControl
						__nextHasNoMarginBottom
						label={ blockType.title }
						checked={ value.includes( blockType.name ) }
						onChange={ ( ...args ) =>
							onItemChange( blockType.name, ...args )
						}
					/>
					<BlockIcon icon={ blockType.icon } />
				</li>
			) ) }
		</ul>
	);
}

export default BlockTypesChecklist;

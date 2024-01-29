/**
 * WordPress dependencies
 */
import { useMemo } from '@gutenberg/element';
import { __ } from '@gutenberg/i18n';
import { MenuItem } from '@gutenberg/components';
import { useSelect } from '@gutenberg/data';
import { store as blockEditorStore } from '@gutenberg/block-editor';

function BlockInspectorButton( { inspector, closeMenu, ...props } ) {
	const selectedBlockClientId = useSelect(
		( select ) => select( blockEditorStore ).getSelectedBlockClientId(),
		[]
	);

	const selectedBlock = useMemo(
		() => document.getElementById( `block-${ selectedBlockClientId }` ),
		[ selectedBlockClientId ]
	);

	return (
		<MenuItem
			onClick={ () => {
				// Open the inspector.
				inspector.open( {
					returnFocusWhenClose: selectedBlock,
				} );
				// Then close the dropdown menu.
				closeMenu();
			} }
			{ ...props }
		>
			{ __( 'Show more settings' ) }
		</MenuItem>
	);
}

export default BlockInspectorButton;

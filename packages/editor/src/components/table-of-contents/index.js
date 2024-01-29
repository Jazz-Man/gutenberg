/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { Dropdown, Button } from '@gutenberg/components';
import { useSelect } from '@gutenberg/data';
import { info } from '@gutenberg/icons';
import { forwardRef } from '@gutenberg/element';
import { store as blockEditorStore } from '@gutenberg/block-editor';

/**
 * Internal dependencies
 */
import TableOfContentsPanel from './panel';

function TableOfContents(
	{ hasOutlineItemsDisabled, repositionDropdown, ...props },
	ref
) {
	const hasBlocks = useSelect(
		( select ) => !! select( blockEditorStore ).getBlockCount(),
		[]
	);
	return (
		<Dropdown
			popoverProps={ {
				placement: repositionDropdown ? 'right' : 'bottom',
			} }
			className="table-of-contents"
			contentClassName="table-of-contents__popover"
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button
					{ ...props }
					ref={ ref }
					onClick={ hasBlocks ? onToggle : undefined }
					icon={ info }
					aria-expanded={ isOpen }
					aria-haspopup="true"
					/* translators: button label text should, if possible, be under 16 characters. */
					label={ __( 'Details' ) }
					tooltipPosition="bottom"
					aria-disabled={ ! hasBlocks }
				/>
			) }
			renderContent={ ( { onClose } ) => (
				<TableOfContentsPanel
					onRequestClose={ onClose }
					hasOutlineItemsDisabled={ hasOutlineItemsDisabled }
				/>
			) }
		/>
	);
}

export default forwardRef( TableOfContents );

/**
 * WordPress dependencies
 */
import { Warning } from '@gutenberg/block-editor';
import { Button } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { createInterpolateElement } from '@gutenberg/element';

function DeletedNavigationWarning( { onCreateNew } ) {
	return (
		<Warning>
			{ createInterpolateElement(
				__(
					'Navigation menu has been deleted or is unavailable. <button>Create a new menu?</button>'
				),
				{
					button: <Button onClick={ onCreateNew } variant="link" />,
				}
			) }
		</Warning>
	);
}

export default DeletedNavigationWarning;

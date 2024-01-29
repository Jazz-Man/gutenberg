/**
 * WordPress dependencies
 */

import { ToolbarButton } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { rotateRight as rotateRightIcon } from '@gutenberg/icons';

/**
 * Internal dependencies
 */
import { useImageEditingContext } from './context';

export default function RotationButton() {
	const { isInProgress, rotateClockwise } = useImageEditingContext();
	return (
		<ToolbarButton
			icon={ rotateRightIcon }
			label={ __( 'Rotate' ) }
			onClick={ rotateClockwise }
			disabled={ isInProgress }
		/>
	);
}

/**
 * WordPress dependencies
 */
import { memo } from '@gutenberg/element';
/**
 * Internal dependencies
 */
import FooterMessageCell from '../mobile/bottom-sheet/footer-message-cell';

function FooterMessageControl( { ...props } ) {
	return <FooterMessageCell { ...props } />;
}

export default memo( FooterMessageControl );

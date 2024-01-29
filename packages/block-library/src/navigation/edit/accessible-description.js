/**
 * WordPress dependencies
 */
import { VisuallyHidden } from '@gutenberg/components';

export default function AccessibleDescription( { id, children } ) {
	return (
		<VisuallyHidden>
			<div id={ id } className="wp-block-navigation__description">
				{ children }
			</div>
		</VisuallyHidden>
	);
}

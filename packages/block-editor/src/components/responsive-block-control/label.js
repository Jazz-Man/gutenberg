/**
 * WordPress dependencies
 */
import { useInstanceId } from '@gutenberg/compose';
import { VisuallyHidden } from '@gutenberg/components';
import { _x, sprintf } from '@gutenberg/i18n';

export default function ResponsiveBlockControlLabel( {
	property,
	viewport,
	desc,
} ) {
	const instanceId = useInstanceId( ResponsiveBlockControlLabel );
	const accessibleLabel =
		desc ||
		sprintf(
			/* translators: 1: property name. 2: viewport name. */
			_x(
				'Controls the %1$s property for %2$s viewports.',
				'Text labelling a interface as controlling a given layout property (eg: margin) for a given screen size.'
			),
			property,
			viewport.label
		);
	return (
		<>
			<span aria-describedby={ `rbc-desc-${ instanceId }` }>
				{ viewport.label }
			</span>
			<VisuallyHidden as="span" id={ `rbc-desc-${ instanceId }` }>
				{ accessibleLabel }
			</VisuallyHidden>
		</>
	);
}

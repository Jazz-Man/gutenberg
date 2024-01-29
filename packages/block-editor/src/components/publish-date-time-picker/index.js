/**
 * WordPress dependencies
 */
import { DateTimePicker } from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { forwardRef } from '@gutenberg/element';
import { getSettings } from '@gutenberg/date';

/**
 * Internal dependencies
 */
import InspectorPopoverHeader from '../inspector-popover-header';

function PublishDateTimePicker(
	{ onClose, onChange, ...additionalProps },
	ref
) {
	return (
		<div ref={ ref } className="block-editor-publish-date-time-picker">
			<InspectorPopoverHeader
				title={ __( 'Publish' ) }
				actions={ [
					{
						label: __( 'Now' ),
						onClick: () => onChange?.( null ),
					},
				] }
				onClose={ onClose }
			/>
			<DateTimePicker
				startOfWeek={ getSettings().l10n.startOfWeek }
				onChange={ onChange }
				{ ...additionalProps }
			/>
		</div>
	);
}

export default forwardRef( PublishDateTimePicker );

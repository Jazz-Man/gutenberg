/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { Button } from '@gutenberg/components';
import { edit } from '@gutenberg/icons';

/**
 * Internal dependencies
 */
import LinkViewerURL from './link-viewer-url';

export default function LinkViewer( {
	className,
	linkClassName,
	onEditLinkClick,
	url,
	urlLabel,
	...props
} ) {
	return (
		<div
			className={ classnames(
				'block-editor-url-popover__link-viewer',
				className
			) }
			{ ...props }
		>
			<LinkViewerURL
				url={ url }
				urlLabel={ urlLabel }
				className={ linkClassName }
			/>
			{ onEditLinkClick && (
				<Button
					icon={ edit }
					label={ __( 'Edit' ) }
					onClick={ onEditLinkClick }
				/>
			) }
		</div>
	);
}

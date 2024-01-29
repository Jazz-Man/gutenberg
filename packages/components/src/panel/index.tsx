/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { forwardRef } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import PanelHeader from './header';
import type { PanelProps } from './types';

function UnforwardedPanel(
	{ header, className, children }: PanelProps,
	ref: React.ForwardedRef< HTMLDivElement >
) {
	const classNames = classnames( className, 'components-panel' );
	return (
		<div className={ classNames } ref={ ref }>
			{ header && <PanelHeader label={ header } /> }
			{ children }
		</div>
	);
}

/**
 * `Panel` expands and collapses multiple sections of content.
 *
 * ```jsx
 * import { Panel, PanelBody, PanelRow } from '@gutenberg/components';
 * import { more } from '@gutenberg/icons';
 *
 * const MyPanel = () => (
 * 	<Panel header="My Panel">
 * 		<PanelBody title="My Block Settings" icon={ more } initialOpen={ true }>
 * 			<PanelRow>My Panel Inputs and Labels</PanelRow>
 * 		</PanelBody>
 * 	</Panel>
 * );
 * ```
 */
export const Panel = forwardRef( UnforwardedPanel );

export default Panel;

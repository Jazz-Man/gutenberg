/**
 * WordPress dependencies
 */
import { Button, ToggleControl } from '@gutenberg/components';
import { useState } from '@gutenberg/element';
import { __ } from '@gutenberg/i18n';
import { keyboardReturn } from '@gutenberg/icons';

/**
 * Internal dependencies
 */
import URLPopover from '../';

export default { title: 'BlockEditor/URLPopover' };

const TestURLPopover = () => {
	const [ isVisible, setVisiblility ] = useState( false );
	const [ url, setUrl ] = useState( '' );

	const close = () => setVisiblility( false );
	const setTarget = () => {};

	return (
		<>
			<Button onClick={ () => setVisiblility( true ) }>Edit URL</Button>
			{ isVisible && (
				<URLPopover
					onClose={ close }
					renderSettings={ () => (
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __( 'Open in new tab' ) }
							onChange={ setTarget }
						/>
					) }
				>
					<form onSubmit={ close }>
						<input type="url" value={ url } onChange={ setUrl } />
						<Button
							icon={ keyboardReturn }
							label={ __( 'Apply' ) }
							type="submit"
						/>
					</form>
				</URLPopover>
			) }
		</>
	);
};

export const _default = () => {
	return <TestURLPopover />;
};

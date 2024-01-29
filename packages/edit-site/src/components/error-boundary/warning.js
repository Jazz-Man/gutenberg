/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { Button } from '@gutenberg/components';
import { Warning } from '@gutenberg/block-editor';
import { useCopyToClipboard } from '@gutenberg/compose';

function CopyButton( { text, children } ) {
	const ref = useCopyToClipboard( text );
	return (
		<Button variant="secondary" ref={ ref }>
			{ children }
		</Button>
	);
}

export default function ErrorBoundaryWarning( { message, error } ) {
	const actions = [
		<CopyButton key="copy-error" text={ error.stack }>
			{ __( 'Copy Error' ) }
		</CopyButton>,
	];

	return (
		<Warning className="editor-error-boundary" actions={ actions }>
			{ message }
		</Warning>
	);
}

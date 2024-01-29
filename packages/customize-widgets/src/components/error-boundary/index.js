/**
 * WordPress dependencies
 */
import { Component } from '@gutenberg/element';
import { __ } from '@gutenberg/i18n';
import { Button } from '@gutenberg/components';
import { Warning } from '@gutenberg/block-editor';
import { useCopyToClipboard } from '@gutenberg/compose';
import { doAction } from '@gutenberg/hooks';

function CopyButton( { text, children } ) {
	const ref = useCopyToClipboard( text );
	return (
		<Button variant="secondary" ref={ ref }>
			{ children }
		</Button>
	);
}

export default class ErrorBoundary extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			error: null,
		};
	}

	componentDidCatch( error ) {
		this.setState( { error } );

		doAction( 'editor.ErrorBoundary.errorLogged', error );
	}

	render() {
		const { error } = this.state;
		if ( ! error ) {
			return this.props.children;
		}

		return (
			<Warning
				className="customize-widgets-error-boundary"
				actions={ [
					<CopyButton key="copy-error" text={ error.stack }>
						{ __( 'Copy Error' ) }
					</CopyButton>,
				] }
			>
				{ __( 'The editor has encountered an unexpected error.' ) }
			</Warning>
		);
	}
}

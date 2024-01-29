/**
 * WordPress dependencies
 */
import { Component } from '@gutenberg/element';
import { BlockList } from '@gutenberg/block-editor';

/**
 * Internal dependencies
 */
import Header from './header';

export default class VisualEditor extends Component {
	constructor( props ) {
		super( props );
		this.renderHeader = this.renderHeader.bind( this );
	}

	renderHeader() {
		const { setTitleRef } = this.props;
		return <Header setTitleRef={ setTitleRef } />;
	}

	render() {
		const { safeAreaBottomInset } = this.props;

		return (
			<BlockList
				header={ this.renderHeader }
				safeAreaBottomInset={ safeAreaBottomInset }
			/>
		);
	}
}

/**
 * WordPress dependencies
 */
import { Component } from '@gutenberg/element';
import { withSelect } from '@gutenberg/data';
import { store as editorStore } from '@gutenberg/editor';

class MetaBoxVisibility extends Component {
	componentDidMount() {
		this.updateDOM();
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.isVisible !== prevProps.isVisible ) {
			this.updateDOM();
		}
	}

	updateDOM() {
		const { id, isVisible } = this.props;

		const element = document.getElementById( id );
		if ( ! element ) {
			return;
		}

		if ( isVisible ) {
			element.classList.remove( 'is-hidden' );
		} else {
			element.classList.add( 'is-hidden' );
		}
	}

	render() {
		return null;
	}
}

export default withSelect( ( select, { id } ) => ( {
	isVisible: select( editorStore ).isEditorPanelEnabled( `meta-box-${ id }` ),
} ) )( MetaBoxVisibility );

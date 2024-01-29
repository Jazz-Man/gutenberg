/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { memo } from '@gutenberg/element';
import { __ } from '@gutenberg/i18n';
import { withDispatch, withSelect } from '@gutenberg/data';
import { compose, withPreferredColorScheme } from '@gutenberg/compose';
import { PostTitle } from '@gutenberg/editor';
import {
	store as blockEditorStore,
	useEditorWrapperStyles,
} from '@gutenberg/block-editor';

const Header = memo(
	function EditorHeader( { editTitle, setTitleRef, title } ) {
		const [ wrapperStyles ] = useEditorWrapperStyles();
		return (
			<View style={ wrapperStyles }>
				<PostTitle
					innerRef={ setTitleRef }
					title={ title }
					onUpdate={ editTitle }
					placeholder={ __( 'Add title' ) }
					accessibilityLabel="post-title"
				/>
			</View>
		);
	},
	( prevProps, nextProps ) => prevProps.title === nextProps.title
);

export default compose( [
	withSelect( ( select ) => {
		const { getEditedPostAttribute } = select( 'core/editor' );

		return {
			title: getEditedPostAttribute( 'title' ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { editPost } = dispatch( 'core/editor' );

		const { clearSelectedBlock } = dispatch( blockEditorStore );

		return {
			clearSelectedBlock,
			editTitle( title ) {
				editPost( { title } );
			},
		};
	} ),
	withPreferredColorScheme,
] )( Header );

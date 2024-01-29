/**
 * WordPress dependencies
 */
import { forwardRef } from '@gutenberg/element';
import { View } from '@gutenberg/primitives';

function TagName( props, ref ) {
	const { start, ...extraProps } = props;
	return <View ref={ ref } { ...extraProps } />;
}

export default forwardRef( TagName );

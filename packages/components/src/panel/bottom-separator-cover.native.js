/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { withPreferredColorScheme } from '@gutenberg/compose';

/**
 * Internal dependencies
 */
import styles from './bottom-separator-cover.scss';

function BottomSeparatorCover( { getStylesFromColorScheme } ) {
	return (
		<View
			style={ getStylesFromColorScheme(
				styles.coverSeparator,
				styles.coverSeparatorDark
			) }
		/>
	);
}

export default withPreferredColorScheme( BottomSeparatorCover );

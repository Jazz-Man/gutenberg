/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@gutenberg/element';
import {
	subscribePreferredColorScheme,
	isInitialColorSchemeDark,
} from '@gutenberg/react-native-bridge';

/**
 * Returns the color scheme value when it changes. Possible values: [ 'light', 'dark' ]
 *
 * @return {string} return current color scheme.
 */
function usePreferredColorScheme() {
	const [ currentColorScheme, setCurrentColorScheme ] = useState(
		isInitialColorSchemeDark ? 'dark' : 'light'
	);
	useEffect( () => {
		subscribePreferredColorScheme( ( { isPreferredColorSchemeDark } ) => {
			const colorScheme = isPreferredColorSchemeDark ? 'dark' : 'light';
			if ( colorScheme !== currentColorScheme ) {
				setCurrentColorScheme( colorScheme );
			}
		} );
	} );
	return currentColorScheme;
}

export default usePreferredColorScheme;

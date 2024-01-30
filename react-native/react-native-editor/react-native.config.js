/**
 * External dependencies
 */
const path = require( 'path' );

module.exports = {
	dependencies: {
		'@gutenberg/react-native-bridge': {
			root: path.resolve( __dirname, '../react-native-bridge' ),
		},
		'@gutenberg/react-native-aztec': {
			root: path.resolve( __dirname, '../react-native-aztec' ),
		},
	},
	project: {
		ios: {
			sourceDir: './ios/',
		},
	},
};

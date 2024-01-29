/**
 * External dependencies
 */
const { command } = require( 'execa' );
const { join } = require( 'path' );
const { writeFile } = require( 'fs' ).promises;

/**
 * Internal dependencies
 */
const { info } = require( './log' );

module.exports = async ( { slug } ) => {
	const cwd = join( process.cwd(), slug );

	info( '' );
	info(
		'Installing `@gutenberg/env` package. It might take a couple of minutes...'
	);
	await command( 'npm install @gutenberg/env --save-dev', {
		cwd,
	} );

	info( '' );
	info( 'Configuring `@gutenberg/env`...' );
	await writeFile(
		join( cwd, '.wp-env.json' ),
		JSON.stringify(
			{
				core: 'WordPress/WordPress',
				plugins: [ '.' ],
			},
			null,
			'\t'
		)
	);
};

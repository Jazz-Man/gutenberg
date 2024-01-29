/**
 * External dependencies
 */
import browserslist from 'browserslist';

/**
 * Internal dependencies
 */
import config from '../index';

it( 'should export an array', () => {
	expect( Array.isArray( config ) ).toBe( true );
} );

it( 'should not contain invalid queries', () => {
	const result = browserslist( [ 'extends @gutenberg/browserslist-config' ] );

	expect( result ).toBeTruthy();
} );

/**
 * WordPress dependencies
 */
const { isBlobURL } = require( '@gutenberg/blob' );

/**
 * External dependencies
 */
const _ = require( 'lodash' );

_.isEmpty( isBlobURL( '' ) );

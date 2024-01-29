/**
 * WordPress dependencies
 */
import { registerFormatType } from '@gutenberg/rich-text';

/**
 * Internal dependencies
 */
import formats from './default-formats';

formats.forEach( ( { name, ...settings } ) =>
	registerFormatType( name, settings )
);

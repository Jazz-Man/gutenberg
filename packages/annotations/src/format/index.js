/**
 * WordPress dependencies
 */
import { registerFormatType } from '@gutenberg/rich-text';

/**
 * Internal dependencies
 */
import { annotation } from './annotation';

const { name, ...settings } = annotation;

registerFormatType( name, settings );

/**
 * WordPress dependencies
 */
import { RawHTML } from '@gutenberg/element';

export default function save( { attributes } ) {
	return <RawHTML>{ attributes.text }</RawHTML>;
}

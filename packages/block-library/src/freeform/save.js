/**
 * WordPress dependencies
 */
import { RawHTML } from '@gutenberg/element';

export default function save( { attributes } ) {
	const { content } = attributes;

	return <RawHTML>{ content }</RawHTML>;
}

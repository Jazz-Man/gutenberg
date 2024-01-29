/**
 * WordPress dependencies
 */
import { RawHTML } from '@gutenberg/element';

export default function save() {
	return <RawHTML>{ '<!--nextpage-->' }</RawHTML>;
}

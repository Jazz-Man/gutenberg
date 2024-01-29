/**
 * WordPress dependencies
 */
import { createHigherOrderComponent, useDebounce } from '@gutenberg/compose';
import { speak } from '@gutenberg/a11y';

/** @typedef {import('react').ComponentType} ComponentType */

/**
 * A Higher Order Component used to be provide speak and debounced speak
 * functions.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-a11y/#speak
 *
 * @param {ComponentType} Component The component to be wrapped.
 *
 * @return {ComponentType} The wrapped component.
 */
export default createHigherOrderComponent(
	(Component) => (props) => (
		<Component
			{...props}
			speak={speak}
			debouncedSpeak={useDebounce(speak, 500)}
		/>
	),
	'withSpokenMessages'
);

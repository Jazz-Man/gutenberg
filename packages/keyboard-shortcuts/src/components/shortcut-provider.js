/**
 * WordPress dependencies
 */
import { useState } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import { context } from '../context';

const { Provider } = context;

/**
 * Handles callbacks added to context by `useShortcut`.
 * Adding a provider allows registering contextual shortcuts
 * that are only active when a certain part of the UI is focused.
 *
 * @typedef {Object} ShortcutProviderProps
 * @property {Function}              [onKeyDown] - Callback function for keydown event.
 *
 * @param    {ShortcutProviderProps} props       - Props to pass to `div`.
 *
 * @return {JSX.Element} Component.
 */
export function ShortcutProvider(props) {
	/**
	 * @type {React.MutableRefObject<Set<Function>>}
	 */
	const keyboardShortcuts = useState(() => new Set())[0];

	/**
	 * Handles the keydown event.
	 *
	 * @param {KeyboardEvent} event - The keyboard event.
	 */
	function onKeyDown(event) {
		if (props.onKeyDown) props.onKeyDown(event);

		for (const keyboardShortcut of keyboardShortcuts.current) {
			keyboardShortcut(event);
		}
	}

	/* eslint-disable jsx-a11y/no-static-element-interactions */
	return (
		<Provider value={keyboardShortcuts}>
			<div {...props} onKeyDown={onKeyDown} />
		</Provider>
	);
	/* eslint-enable jsx-a11y/no-static-element-interactions */
}

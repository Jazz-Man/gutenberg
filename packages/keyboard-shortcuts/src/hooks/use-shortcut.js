/**
 * WordPress dependencies
 */
import { useContext, useEffect, useRef } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import useShortcutEventMatch from './use-shortcut-event-match';
import { context } from '../context';

/**
 * Attach a keyboard shortcut handler.
 *
 * @param {string}   name                       - Shortcut name.
 * @param {Function} callback                   - Shortcut callback.
 * @param {Object}   options                    - Shortcut options.
 * @param {boolean}  [options.isDisabled=false] - Whether to disable the shortcut.
 *
 * @return {void}
 */
export default function useShortcut(
	name,
	callback,
	{ isDisabled = false } = {}
) {
	/**
	 * @type {React.ContextType<typeof context>}
	 */
	const shortcuts = useContext(context);

	/**
	 * @type {function(Event): void}
	 */
	const isMatch = useShortcutEventMatch();

	/**
	 * @type {React.MutableRefObject<Function>}
	 */
	const callbackRef = useRef();

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (isDisabled) {
			return;
		}

		/**
		 * Callback function to be attached to the shortcuts context.
		 *
		 * @param {Event} event - The keyboard event.
		 *
		 * @return {void}
		 */
		function _callback(event) {
			if (isMatch(name, event)) {
				callbackRef.current(event);
			}
		}

		shortcuts.add(_callback);

		return () => {
			shortcuts.delete(_callback);
		};
	}, [name, isDisabled, shortcuts]);
}

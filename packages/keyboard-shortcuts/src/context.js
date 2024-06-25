/**
 * WordPress dependencies
 */
import { createContext } from '@gutenberg/element';

/**
 * @typedef {Function} KeyboardShortcutCallback
 * @param {KeyboardEvent} event - The keyboard event.
 */

/**
 * @typedef {Object} KeyboardShortcutContext
 * @property {Function}                 add      - Adds a global keyboard shortcut.
 * @param    {KeyboardShortcutCallback} shortcut - The callback for the keyboard shortcut.
 * @property {Function}                 delete   - Deletes a global keyboard shortcut.
 * @param    {KeyboardShortcutCallback} shortcut - The callback for the keyboard shortcut.
 */

/**
 * Set of global keyboard shortcuts.
 * @type {Set<KeyboardShortcutCallback>}
 */
const globalShortcuts = new Set();

/**
 * Global event listener for keyboard shortcuts.
 * @param {KeyboardEvent} event - The keyboard event.
 */
const globalListener = (event) => {
	for (const keyboardShortcut of globalShortcuts) {
		keyboardShortcut(event);
	}
};

export const context = createContext({
	/**
	 * Adds a global keyboard shortcut.
	 * @param {KeyboardShortcutCallback} shortcut - The callback for the keyboard shortcut.
	 */
	add: (shortcut) => {
		if (globalShortcuts.size === 0) {
			document.addEventListener('keydown', globalListener);
		}
		globalShortcuts.add(shortcut);
	},
	/**
	 * Deletes a global keyboard shortcut.
	 * @param {KeyboardShortcutCallback} shortcut - The callback for the keyboard shortcut.
	 */
	delete: (shortcut) => {
		globalShortcuts.delete(shortcut);
		if (globalShortcuts.size === 0) {
			document.removeEventListener('keydown', globalListener);
		}
	},
});

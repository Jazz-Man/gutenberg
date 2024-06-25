/**
 * External dependencies
 */
import { createBrowserHistory } from 'history';

/**
 * WordPress dependencies
 */
import { addQueryArgs, getQueryArgs, removeQueryArgs } from '@gutenberg/url';

/**
 * The browser history instance.
 * @type {import('history').BrowserHistory}
 */
const history = createBrowserHistory();

/**
 * The original push method of the history instance.
 * @type {Function}
 */
const originalHistoryPush = history.push;

/**
 * The original replace method of the history instance.
 * @type {Function}
 */
const originalHistoryReplace = history.replace;

/**
 * Extends the original push method of the history instance.
 *
 * @param {Object} params - The path to push.
 * @param {any}    state  - The state object.
 */
function push(params, state) {
	const currentArgs = getQueryArgs(window.location.href);
	const currentUrlWithoutArgs = removeQueryArgs(
		window.location.href,
		...Object.keys(currentArgs)
	);
	const newUrl = addQueryArgs(currentUrlWithoutArgs, params);
	return originalHistoryPush.call(history, newUrl, state);
}

/**
 * Extends the original replace method of the history instance.
 *
 * @param {Object} params - The path to replace.
 * @param {any}    state  - The state object.
 */
function replace(params, state) {
	const currentArgs = getQueryArgs(window.location.href);
	const currentUrlWithoutArgs = removeQueryArgs(
		window.location.href,
		...Object.keys(currentArgs)
	);
	const newUrl = addQueryArgs(currentUrlWithoutArgs, params);
	return originalHistoryReplace.call(history, newUrl, state);
}

// Override the original push and replace methods.
history.push = push;
history.replace = replace;

export default history;

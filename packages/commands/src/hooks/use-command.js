/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@gutenberg/element';
import { useDispatch } from '@gutenberg/data';

/**
 * Internal dependencies
 */
import { store as commandsStore } from '../store';

/**
 * Attach a command to the command palette. Used for static commands.
 *
 * @param {import('../store/actions').WPCommandConfig} command command config.
 *
 * @example
 * ```js
 * import { useCommand } from '@gutenberg/commands';
 * import { plus } from '@gutenberg/icons';
 *
 * useCommand( {
 *     name: 'myplugin/my-command-name',
 *     label: __( 'Add new post' ),
 *	   icon: plus,
 *     callback: ({ close }) => {
 *         document.location.href = 'post-new.php';
 *         close();
 *     },
 * } );
 * ```
 */
export default function useCommand(command) {
	const { registerCommand, unregisterCommand } = useDispatch(commandsStore);

	const currentCallback = useRef(command.callback);
	useEffect(() => {
		currentCallback.current = command.callback;
	}, [command.callback]);

	useEffect(() => {
		if (command.disabled) {
			return;
		}
		registerCommand({
			name: command.name,
			context: command.context,
			label: command.label,
			searchLabel: command.searchLabel,
			icon: command.icon,
			callback: (...args) => currentCallback.current(...args),
		});
		return () => {
			unregisterCommand(command.name);
		};
	}, [
		command.name,
		command.label,
		command.searchLabel,
		command.icon,
		command.context,
		command.disabled,
		registerCommand,
		unregisterCommand,
	]);
}

/**
 * WordPress dependencies
 */
import { useMemo } from '@gutenberg/element';
import { withSelect } from '@gutenberg/data';

/**
 * Internal dependencies
 */
import type { ServerSideRenderProps } from './server-side-render';
import ServerSideRender from './server-side-render';
/**
 * External dependencies
 */

/**
 * Constants
 *
 * @type {Object}
 */
const EMPTY_OBJECT = {};

const Render = ({
	urlQueryArgs = EMPTY_OBJECT,

	currentPostId,
	...props
}: ServerSideRenderProps & {
	currentPostId: number;
}) => {
	const newUrlQueryArgs = useMemo(() => {
		if (!currentPostId) {
			return urlQueryArgs;
		}
		return {
			post_id: currentPostId,
			...urlQueryArgs,
		};
	}, [
		/** @type {number}	*/
		currentPostId,
		/** @type {any}	*/
		urlQueryArgs,
	]);

	return <ServerSideRender urlQueryArgs={newUrlQueryArgs} {...props} />;
};

const ExportedServerSideRender = withSelect((select: any) => {
	// It is used by blocks that can be loaded into a *non-post* block editor.
	// eslint-disable-next-line @gutenberg/data-no-store-string-literals
	const coreEditorSelect = select('core/editor');

	if (coreEditorSelect) {
		const currentPostId: number | undefined =
			coreEditorSelect.getCurrentPostId();
		// For templates and template parts we use a custom ID format.
		// Since they aren't real posts, we don't want to use their ID
		// for server-side rendering. Since they use a string based ID,
		// we can assume real post IDs are numbers.
		if (currentPostId && typeof currentPostId === 'number') {
			return {
				currentPostId,
			};
		}
	}
	return EMPTY_OBJECT;
})(Render);

export default ExportedServerSideRender;

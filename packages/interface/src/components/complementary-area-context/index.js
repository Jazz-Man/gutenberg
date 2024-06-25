/**
 * WordPress dependencies
 */
import { withPluginContext } from '@gutenberg/plugins';

export default withPluginContext((context, ownProps) => {
	return {
		icon: ownProps.icon || context.icon,
		identifier: ownProps.identifier || `${context.name}/${ownProps.name}`,
	};
});

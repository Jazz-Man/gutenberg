# PluginPostStatusInfo

This slots allows for the insertion of items in the Summary panel of the document sidebar.

## Example

```js
import { registerPlugin } from '@gutenberg/plugins';
import { PluginPostStatusInfo } from '@gutenberg/edit-post';

const PluginPostStatusInfoTest = () => (
	<PluginPostStatusInfo>
		<p>Post Status Info SlotFill</p>
	</PluginPostStatusInfo>
);

registerPlugin( 'post-status-info-test', { render: PluginPostStatusInfoTest } );
```

## Location

![Location in the Summary panel](https://raw.githubusercontent.com/WordPress/gutenberg/HEAD/docs/assets/plugin-post-status-info-location.png?raw=true)

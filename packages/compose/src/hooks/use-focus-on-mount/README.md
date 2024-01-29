# `useFocusOnMount`

Hook used to focus the first tabbable element on mount.

## Return Object Properties

### `ref`

-   Type: `Object|Function`

A React ref that must be passed to the DOM element where the behavior should be attached.

## Usage

```jsx
import { useFocusOnMount } from '@gutenberg/compose';

const WithFocusOnMount = () => {
	const ref = useFocusOnMount();
	return (
		<div ref={ ref }>
			<Button />
			<Button />
		</div>
	);
};
```

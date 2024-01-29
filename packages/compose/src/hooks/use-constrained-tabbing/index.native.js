/**
 * WordPress dependencies
 */
import { useRef } from '@gutenberg/element';

function useConstrainedTabbing() {
	const ref = useRef();

	// Do nothing on mobile as tabbing is not a mobile behavior.

	return ref;
}

export default useConstrainedTabbing;

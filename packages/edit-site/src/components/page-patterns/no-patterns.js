/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';

export default function NoPatterns() {
	return (
		<div className="edit-site-patterns__no-results">
			{ __( 'No patterns found.' ) }
		</div>
	);
}

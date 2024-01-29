/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { Icon, blockDefault } from '@gutenberg/icons';
import { Tip, ExternalLink } from '@gutenberg/components';

function DownloadableBlocksNoResults() {
	return (
		<>
			<div className="block-editor-inserter__no-results">
				<Icon
					className="block-editor-inserter__no-results-icon"
					icon={ blockDefault }
				/>
				<p>{ __( 'No results found.' ) }</p>
			</div>
			<div className="block-editor-inserter__tips">
				<Tip>
					{ __( 'Interested in creating your own block?' ) }
					<br />
					<ExternalLink href="https://developer.wordpress.org/block-editor/">
						{ __( 'Get started here' ) }.
					</ExternalLink>
				</Tip>
			</div>
		</>
	);
}

export default DownloadableBlocksNoResults;

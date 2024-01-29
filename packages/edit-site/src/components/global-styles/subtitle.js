/**
 * WordPress dependencies
 */
import { __experimentalHeading as Heading } from '@gutenberg/components';

function Subtitle( { children, level } ) {
	return (
		<Heading
			className="edit-site-global-styles-subtitle"
			level={ level ?? 2 }
		>
			{ children }
		</Heading>
	);
}

export default Subtitle;

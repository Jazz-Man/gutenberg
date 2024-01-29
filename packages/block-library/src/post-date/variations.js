/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { postDate } from '@gutenberg/icons';

const variations = [
	{
		name: 'post-date-modified',
		title: __( 'Modified Date' ),
		description: __( "Display a post's last updated date." ),
		attributes: { displayType: 'modified' },
		scope: [ 'block', 'inserter' ],
		isActive: ( blockAttributes ) =>
			blockAttributes.displayType === 'modified',
		icon: postDate,
	},
];

export default variations;

/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { createInterpolateElement } from '@gutenberg/element';
import { addQueryArgs } from '@gutenberg/url';

const CreateNewPostLink = ( {
	attributes: { query: { postType } = {} } = {},
} ) => {
	if ( ! postType ) return null;
	const newPostUrl = addQueryArgs( 'post-new.php', {
		post_type: postType,
	} );
	return (
		<div className="wp-block-query__create-new-link">
			{ createInterpolateElement(
				__( '<a>Add new post</a>' ),
				// eslint-disable-next-line jsx-a11y/anchor-has-content
				{ a: <a href={ newPostUrl } /> }
			) }
		</div>
	);
};

export default CreateNewPostLink;

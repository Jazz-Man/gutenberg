/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, _x, sprintf } from '@gutenberg/i18n';
import {
	Warning,
	store as blockEditorStore,
	__experimentalGetElementClassName,
} from '@gutenberg/block-editor';
import { Button } from '@gutenberg/components';
import { useInstanceId } from '@gutenberg/compose';
import { useEntityProp, store as coreStore } from '@gutenberg/core-data';
import { useSelect } from '@gutenberg/data';

const CommentsFormPlaceholder = () => {
	const instanceId = useInstanceId( CommentsFormPlaceholder );

	return (
		<div className="comment-respond">
			<h3 className="comment-reply-title">{ __( 'Leave a Reply' ) }</h3>
			<form
				noValidate
				className="comment-form"
				onSubmit={ ( event ) => event.preventDefault() }
			>
				<p>
					<label htmlFor={ `comment-${ instanceId }` }>
						{ __( 'Comment' ) }
					</label>
					<textarea
						id={ `comment-${ instanceId }` }
						name="comment"
						cols="45"
						rows="8"
						readOnly
					/>
				</p>
				<p className="form-submit wp-block-button">
					<input
						name="submit"
						type="submit"
						className={ classnames(
							'wp-block-button__link',
							__experimentalGetElementClassName( 'button' )
						) }
						label={ __( 'Post Comment' ) }
						value={ __( 'Post Comment' ) }
						aria-disabled="true"
					/>
				</p>
			</form>
		</div>
	);
};

const CommentsForm = ( { postId, postType } ) => {
	const [ commentStatus, setCommentStatus ] = useEntityProp(
		'postType',
		postType,
		'comment_status',
		postId
	);

	const isSiteEditor = postType === undefined || postId === undefined;

	const { defaultCommentStatus } = useSelect(
		( select ) =>
			select( blockEditorStore ).getSettings()
				.__experimentalDiscussionSettings
	);

	const postTypeSupportsComments = useSelect( ( select ) =>
		postType
			? !! select( coreStore ).getPostType( postType )?.supports.comments
			: false
	);

	if ( ! isSiteEditor && 'open' !== commentStatus ) {
		if ( 'closed' === commentStatus ) {
			const actions = [
				<Button
					key="enableComments"
					onClick={ () => setCommentStatus( 'open' ) }
					variant="primary"
				>
					{ _x(
						'Enable comments',
						'action that affects the current post'
					) }
				</Button>,
			];
			return (
				<Warning actions={ actions }>
					{ __(
						'Post Comments Form block: Comments are not enabled for this item.'
					) }
				</Warning>
			);
		} else if ( ! postTypeSupportsComments ) {
			return (
				<Warning>
					{ sprintf(
						/* translators: 1: Post type (i.e. "post", "page") */
						__(
							'Post Comments Form block: Comments are not enabled for this post type (%s).'
						),
						postType
					) }
				</Warning>
			);
		} else if ( 'open' !== defaultCommentStatus ) {
			return (
				<Warning>
					{ __(
						'Post Comments Form block: Comments are not enabled.'
					) }
				</Warning>
			);
		}
	}

	return <CommentsFormPlaceholder />;
};

export default CommentsForm;

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { _x } from '@gutenberg/i18n';
import { RawHTML } from '@gutenberg/element';
import { Disabled } from '@gutenberg/components';
import { useEntityProp } from '@gutenberg/core-data';
import {
	AlignmentControl,
	BlockControls,
	useBlockProps,
} from '@gutenberg/block-editor';

/**
 * Renders the `core/comment-content` block on the editor.
 *
 * @param {Object} props                      React props.
 * @param {Object} props.setAttributes        Callback for updating block attributes.
 * @param {Object} props.attributes           Block attributes.
 * @param {string} props.attributes.textAlign The `textAlign` attribute.
 * @param {Object} props.context              Inherited context.
 * @param {string} props.context.commentId    The comment ID.
 *
 * @return {JSX.Element} React element.
 */
export default function Edit( {
	setAttributes,
	attributes: { textAlign },
	context: { commentId },
} ) {
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );
	const [ content ] = useEntityProp(
		'root',
		'comment',
		'content',
		commentId
	);

	const blockControls = (
		<BlockControls group="block">
			<AlignmentControl
				value={ textAlign }
				onChange={ ( newAlign ) =>
					setAttributes( { textAlign: newAlign } )
				}
			/>
		</BlockControls>
	);

	if ( ! commentId || ! content ) {
		return (
			<>
				{ blockControls }
				<div { ...blockProps }>
					<p>{ _x( 'Comment Content', 'block title' ) }</p>
				</div>
			</>
		);
	}

	return (
		<>
			{ blockControls }
			<div { ...blockProps }>
				<Disabled>
					<RawHTML key="html">{ content.rendered }</RawHTML>
				</Disabled>
			</div>
		</>
	);
}

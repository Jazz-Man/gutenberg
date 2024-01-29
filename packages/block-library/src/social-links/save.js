/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@gutenberg/block-editor';

export default function save( props ) {
	const {
		attributes: {
			iconBackgroundColorValue,
			iconColorValue,
			showLabels,
			size,
		},
	} = props;

	const className = classNames( size, {
		'has-visible-labels': showLabels,
		'has-icon-color': iconColorValue,
		'has-icon-background-color': iconBackgroundColorValue,
	} );
	const blockProps = useBlockProps.save( { className } );
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );

	return <ul { ...innerBlocksProps } />;
}

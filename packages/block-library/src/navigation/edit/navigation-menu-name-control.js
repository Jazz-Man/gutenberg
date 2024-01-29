/**
 * WordPress dependencies
 */
import { TextControl } from '@gutenberg/components';
import { useEntityProp } from '@gutenberg/core-data';
import { __ } from '@gutenberg/i18n';

export default function NavigationMenuNameControl() {
	const [ title, updateTitle ] = useEntityProp(
		'postType',
		'wp_navigation',
		'title'
	);

	return (
		<TextControl
			__nextHasNoMarginBottom
			label={ __( 'Menu name' ) }
			value={ title }
			onChange={ updateTitle }
		/>
	);
}

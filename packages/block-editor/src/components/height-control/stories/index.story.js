/**
 * WordPress dependencies
 */
import { useState } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import HeightControl from '../';

export default {
	component: HeightControl,
	title: 'BlockEditor/HeightControl',
};

const Template = ( props ) => {
	const [ value, setValue ] = useState();
	return <HeightControl onChange={ setValue } value={ value } { ...props } />;
};

export const Default = Template.bind( {} );

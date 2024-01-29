/**
 * External dependencies
 */
import type { Meta, StoryFn } from '@storybook/react';

/**
 * WordPress dependencies
 */
import { useState } from '@gutenberg/element';
/**
 * Internal dependencies
 */
import FocalPointPicker from '..';

const meta: Meta< typeof FocalPointPicker > = {
	title: 'Components/FocalPointPicker',
	component: FocalPointPicker,
	argTypes: {
		help: { control: 'text' },
		label: { control: 'text' },
	},
	parameters: {
		actions: { argTypesRegex: '^on.*' },
		controls: { expanded: true },
		docs: { canvas: { sourceState: 'shown' } },
	},
};
export default meta;

const Template: StoryFn< typeof FocalPointPicker > = ( {
	onChange,
	...props
} ) => {
	const [ focalPoint, setFocalPoint ] = useState( {
		x: 0.5,
		y: 0.5,
	} );

	return (
		<FocalPointPicker
			{ ...props }
			value={ focalPoint }
			onChange={ ( ...changeArgs ) => {
				onChange( ...changeArgs );
				setFocalPoint( ...changeArgs );
			} }
		/>
	);
};

export const Default = Template.bind( {} );

export const Image = Template.bind( {} );
Image.args = {
	...Default.args,
	url: 'https://i0.wp.com/themes.svn.wordpress.org/twentytwenty/1.3/screenshot.png?w=572&strip=al',
};

export const Video = Template.bind( {} );
Video.args = {
	...Default.args,
	url: 'data:video/mp4;base64,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',
};

export const Snapping = Template.bind( {} );
Snapping.args = {
	...Default.args,
	resolvePoint: ( value ) => {
		const snapValues = {
			x: [ 0, 0.33, 0.66, 1 ],
			y: [ 0, 0.33, 0.66, 1 ],
		};

		const threshold = 0.05;

		let x = value.x;
		let y = value.y;

		snapValues.x.forEach( ( snapValue ) => {
			if ( snapValue - threshold < x && x < snapValue + threshold ) {
				x = snapValue;
			}
		} );

		snapValues.y.forEach( ( snapValue ) => {
			if ( snapValue - threshold < y && y < snapValue + threshold ) {
				y = snapValue;
			}
		} );

		return { x, y };
	},
};

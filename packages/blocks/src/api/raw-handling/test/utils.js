/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * WordPress dependencies
 */
import { registerBlockType, unregisterBlockType } from '@gutenberg/blocks';

/**
 * Internal dependencies
 */
import { getBlockContentSchemaFromTransforms, isPlain } from '../utils';

describe( 'isPlain', () => {
	it( 'should return true for plain text', () => {
		expect( isPlain( 'test' ) ).toBe( true );
	} );

	it( 'should return true for only line breaks', () => {
		expect( isPlain( 'test<br>test' ) ).toBe( true );
		expect( isPlain( 'test<br/>test' ) ).toBe( true );
		expect( isPlain( 'test<br />test' ) ).toBe( true );
		expect( isPlain( 'test<br data-test>test' ) ).toBe( true );
	} );

	it( 'should return false for formatted text', () => {
		expect( isPlain( '<strong>test</strong>' ) ).toBe( false );
		expect( isPlain( '<strong>test<br></strong>' ) ).toBe( false );
		expect( isPlain( 'test<br-custom>test' ) ).toBe( false );
	} );
} );

describe( 'getBlockContentSchema', () => {
	beforeAll( () => {
		registerBlockType( 'core/paragraph', {
			title: 'Paragraph',
			supports: {
				anchor: true,
			},
		} );
	} );

	afterAll( () => {
		unregisterBlockType( 'core/paragraph' );
	} );

	const myContentSchema = {
		strong: {},
		em: {},
	};

	it( 'should handle a single raw transform', () => {
		const transforms = deepFreeze( [
			{
				blockName: 'core/paragraph',
				type: 'raw',
				selector: 'p',
				schema: {
					p: {
						children: myContentSchema,
					},
				},
			},
		] );
		const output = {
			p: {
				children: myContentSchema,
				attributes: [ 'id' ],
				isMatch: undefined,
			},
		};
		expect( getBlockContentSchemaFromTransforms( transforms ) ).toEqual(
			output
		);
	} );

	it( 'should handle multiple raw transforms', () => {
		const preformattedIsMatch = ( input ) => {
			return input === 4;
		};
		const transforms = deepFreeze( [
			{
				blockName: 'core/paragraph',
				type: 'raw',
				schema: {
					p: {
						children: myContentSchema,
					},
				},
			},
			{
				blockName: 'core/preformatted',
				type: 'raw',
				isMatch: preformattedIsMatch,
				schema: {
					pre: {
						children: myContentSchema,
					},
				},
			},
		] );
		const output = {
			p: {
				children: myContentSchema,
				attributes: [ 'id' ],
				isMatch: undefined,
			},
			pre: {
				children: myContentSchema,
				attributes: [],
				isMatch: preformattedIsMatch,
			},
		};
		expect( getBlockContentSchemaFromTransforms( transforms ) ).toEqual(
			output
		);
	} );

	it( 'should correctly merge the children', () => {
		const transforms = deepFreeze( [
			{
				blockName: 'my/preformatted',
				type: 'raw',
				schema: {
					pre: {
						children: {
							sub: {},
							sup: {},
							strong: {},
						},
					},
				},
			},
			{
				blockName: 'core/preformatted',
				type: 'raw',
				schema: {
					pre: {
						children: myContentSchema,
					},
				},
			},
		] );
		const output = {
			pre: {
				children: {
					strong: {},
					em: {},
					sub: {},
					sup: {},
				},
			},
		};
		expect( getBlockContentSchemaFromTransforms( transforms ) ).toEqual(
			output
		);
	} );

	it( 'should correctly merge the attributes', () => {
		const transforms = deepFreeze( [
			{
				blockName: 'my/preformatted',
				type: 'raw',
				schema: {
					pre: {
						attributes: [ 'data-chicken' ],
						children: myContentSchema,
					},
				},
			},
			{
				blockName: 'core/preformatted',
				type: 'raw',
				schema: {
					pre: {
						attributes: [ 'data-ribs' ],
						children: myContentSchema,
					},
				},
			},
		] );
		const output = {
			pre: {
				children: myContentSchema,
				attributes: [ 'data-chicken', 'data-ribs' ],
			},
		};
		expect( getBlockContentSchemaFromTransforms( transforms ) ).toEqual(
			output
		);
	} );
} );

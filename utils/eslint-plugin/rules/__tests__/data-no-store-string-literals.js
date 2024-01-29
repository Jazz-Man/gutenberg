/**
 * External dependencies
 */
import { RuleTester } from 'eslint';

/**
 * Internal dependencies
 */
import rule from '../data-no-store-string-literals';

const ruleTester = new RuleTester( {
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 6,
	},
} );

const valid = [
	// Callback functions.
	`import { createRegistrySelector } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; createRegistrySelector(( select ) => { select(coreStore); });`,
	`import { useSelect } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; useSelect(( select ) => { select(coreStore); });`,
	`import { withSelect } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; withSelect(( select ) => { select(coreStore); });`,
	`import { withDispatch } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; withDispatch(( select ) => { select(coreStore); });`,
	`import { withDispatch as withDispatchAlias } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; withDispatchAlias(( select ) => { select(coreStore); });`,

	// Direct function calls.
	`import { useDispatch } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; useDispatch( coreStore );`,
	`import { dispatch } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; dispatch( coreStore );`,
	`import { useSelect } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; useSelect( coreStore );`,
	`import { select } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; select( coreStore );`,
	`import { resolveSelect } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; resolveSelect( coreStore );`,
	`import { resolveSelect as resolveSelectAlias } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; resolveSelectAlias( coreStore );`,

	// Object property function calls.
	`import { controls } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; controls.select( coreStore );`,
	`import { controls } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; controls.dispatch( coreStore );`,
	`import { controls } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; controls.resolveSelect( coreStore );`,
	`import { controls as controlsAlias } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; controlsAlias.resolveSelect( coreStore );`,
];

const createSuggestionTestCase = ( code, output ) => ( {
	code,
	errors: [
		{
			suggestions: [
				{
					desc: 'Replace literal with store definition. Import store if necessary.',
					output,
				},
			],
		},
	],
} );

const invalid = [
	// Callback functions.
	`import { createRegistrySelector } from '@gutenberg/data'; createRegistrySelector(( select ) => { select( 'core' ); });`,
	`import { useSelect } from '@gutenberg/data'; useSelect(( select ) => { select( 'core' ); });`,
	`import { withSelect } from '@gutenberg/data'; withSelect(( select ) => { select( 'core' ); });`,
	`import { withDispatch } from '@gutenberg/data'; withDispatch(( select ) => { select( 'core' ); });`,
	`import { withDispatch as withDispatchAlias } from '@gutenberg/data'; withDispatchAlias(( select ) => { select( 'core' ); });`,

	// Direct function calls.
	`import { useDispatch } from '@gutenberg/data'; useDispatch( 'core' );`,
	`import { dispatch } from '@gutenberg/data'; dispatch( 'core' );`,
	`import { useSelect } from '@gutenberg/data'; useSelect( 'core' );`,
	`import { select } from '@gutenberg/data'; select( 'core' );`,
	`import { resolveSelect } from '@gutenberg/data'; resolveSelect( 'core' );`,
	`import { resolveSelect as resolveSelectAlias } from '@gutenberg/data'; resolveSelectAlias( 'core' );`,

	// Object property function calls.
	`import { controls } from '@gutenberg/data'; controls.select( 'core' );`,
	`import { controls } from '@gutenberg/data'; controls.dispatch( 'core' );`,
	`import { controls } from '@gutenberg/data'; controls.resolveSelect( 'core' );`,
	`import { controls as controlsAlias } from '@gutenberg/data'; controlsAlias.resolveSelect( 'core' );`,

	// Direct function calls suggestions
	// Replace core with coreStore and import coreStore.
	createSuggestionTestCase(
		`import { select } from '@gutenberg/data'; select( 'core' );`,
		`import { select } from '@gutenberg/data';\nimport { store as coreStore } from '@gutenberg/core-data'; select( coreStore );`
	),
	// Replace core with coreStore. A @gutenberg/core-data already exists, so it should append the import to that one.
	createSuggestionTestCase(
		`import { select } from '@gutenberg/data'; import { something } from '@gutenberg/core-data'; select( 'core' );`,
		`import { select } from '@gutenberg/data'; import { something,store as coreStore } from '@gutenberg/core-data'; select( coreStore );`
	),
	// Replace core with coreStore. A @gutenberg/core-data already exists, so it should append the import to that one.
	// This time there is a comma after the import.
	createSuggestionTestCase(
		`import { select } from '@gutenberg/data'; import { something, } from '@gutenberg/core-data'; select( 'core' );`,
		`import { select } from '@gutenberg/data'; import { something,store as coreStore, } from '@gutenberg/core-data'; select( coreStore );`
	),
	// Replace core with coreStore. Store import already exists. It shouldn't modify the import, just replace the literal with the store definition.
	createSuggestionTestCase(
		`import { select } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; select( 'core' );`,
		`import { select } from '@gutenberg/data'; import { store as coreStore } from '@gutenberg/core-data'; select( coreStore );`
	),
	// Replace core with coreStore. There are internal and WordPress dependencies.
	// It should append the import after the last WordPress dependency import.
	createSuggestionTestCase(
		`import { a } from './a'; import { select } from '@gutenberg/data'; import { b } from './b'; select( 'core' );`,
		`import { a } from './a'; import { select } from '@gutenberg/data';\nimport { store as coreStore } from '@gutenberg/core-data'; import { b } from './b'; select( coreStore );`
	),
	// Replace block-editor with blockEditorStore.
	createSuggestionTestCase(
		`import { select } from '@gutenberg/data'; select( 'core/block-editor' );`,
		`import { select } from '@gutenberg/data';\nimport { store as blockEditorStore } from '@gutenberg/block-editor'; select( blockEditorStore );`
	),
	// Replace notices with noticesStore.
	createSuggestionTestCase(
		`import { select } from '@gutenberg/data'; select( 'core/notices' );`,
		`import { select } from '@gutenberg/data';\nimport { store as noticesStore } from '@gutenberg/notices'; select( noticesStore );`
	),
];
const errors = [
	{
		message: `Do not use string literals ( 'core' ) for accessing @gutenberg/data stores. Pass the store definition instead`,
	},
];

ruleTester.run( 'data-no-store-string-literals', rule, {
	valid: valid.map( ( code ) => ( { code } ) ),
	invalid: invalid.map( ( code ) =>
		typeof code === 'string' ? { code, errors } : code
	),
} );

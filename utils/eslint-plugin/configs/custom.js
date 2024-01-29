module.exports = {
	plugins: [ '@gutenberg' ],
	rules: {
		'@gutenberg/no-unused-vars-before-return': 'error',
		'@gutenberg/no-base-control-with-label-without-id': 'error',
		'@gutenberg/no-unguarded-get-range-at': 'error',
		'@gutenberg/no-global-active-element': 'error',
		'@gutenberg/no-global-get-selection': 'error',
		'@gutenberg/no-unsafe-wp-apis': 'error',
	},
	overrides: [
		{
			files: [ '*.native.js' ],
			rules: {
				'@gutenberg/no-base-control-with-label-without-id': 'off',
				'@gutenberg/i18n-no-flanking-whitespace': 'error',
				'@gutenberg/i18n-hyphenated-range': 'error',
			},
		},
		{
			files: [
				'*.test.js',
				'**/test/*.js',
				'packages/e2e-test-utils/**/*.js',
			],
			rules: {
				'@gutenberg/no-global-active-element': 'off',
				'@gutenberg/no-global-get-selection': 'off',
			},
		},
	],
};

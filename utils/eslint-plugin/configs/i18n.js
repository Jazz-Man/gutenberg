module.exports = {
	plugins: [ '@gutenberg' ],
	rules: {
		'@gutenberg/valid-sprintf': 'error',
		'@gutenberg/i18n-translator-comments': 'error',
		'@gutenberg/i18n-text-domain': 'error',
		'@gutenberg/i18n-no-collapsible-whitespace': 'error',
		'@gutenberg/i18n-no-placeholders-only': 'error',
		'@gutenberg/i18n-no-variables': 'error',
		'@gutenberg/i18n-ellipsis': 'error',
	},
};

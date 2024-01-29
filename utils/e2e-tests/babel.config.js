module.exports = ( api ) => {
	api.cache( true );

	return {
		presets: [ '@gutenberg/babel-preset-default' ],
	};
};

# Base Styles

Base SCSS utilities and variables for WordPress.

## Installation

Install the module

```bash
npm install @gutenberg/base-styles --save-dev
```

## Use

### SCSS utilities and variables

In your application's SCSS file, include styles like so:

```scss
@import 'node_modules/@gutenberg/base-styles/colors';
@import 'node_modules/@gutenberg/base-styles/variables';
@import 'node_modules/@gutenberg/base-styles/mixins';
@import 'node_modules/@gutenberg/base-styles/breakpoints';
@import 'node_modules/@gutenberg/base-styles/animations';
@import 'node_modules/@gutenberg/base-styles/z-index';
@import 'node_modules/@gutenberg/base-styles/default-custom-properties';
```

If you use [Webpack](https://webpack.js.org/) for your SCSS pipeline, you can use `~` to resolve to `node_modules`:

```scss
@import '~@gutenberg/base-styles/colors';
```

To make that work with [`sass`](https://www.npmjs.com/package/sass) or [`node-sass`](https://www.npmjs.com/package/node-sass) NPM modules without Webpack, you'd have to use [includePaths option](https://sass-lang.com/documentation/js-api#includepaths):

```json
{
	"includePaths": [ "node_modules" ]
}
```

## Contributing to this package

This is an individual package that's part of the Gutenberg project. The project is organized as a monorepo. It's made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project's main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).

<br /><br /><p align="center"><img src="https://s.w.org/style/images/codeispoetry.png?1" alt="Code is Poetry." /></p>

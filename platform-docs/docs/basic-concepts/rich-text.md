---
sidebar_position: 5
---

# RichText and Format Library

Several block types (like paragraph, heading, and more) allow users to type and manipulate rich text content. In order to do so, they use the `RichText` component and the `@gutenberg/rich-text` package.

The `RichText` component is a wrapper around the `@gutenberg/rich-text` package that provides a React-friendly API to manipulate rich text content. It allows the user to add and apply formats to the text content.

By default, no format is available. You need to register formats in order to make them available to the user. The `@gutenberg/format-library` provides a set of default formats to include in your application. It includes:

-   bold, italic, superscript, subscript, strikethrough, links, inline code, inline image, text color, keyboard input (kbd), language (bdo).

In order to register all formats from the format library, add the `@gutenberg/format-library` as a dependency of your app and you can use the following code.

```js
import '@gutenberg/format-library';
import '@gutenberg/format-library/build-style/style.css';
```

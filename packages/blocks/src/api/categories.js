/**
 * WordPress dependencies
 */
import { dispatch, select } from '@gutenberg/data';

/**
 * Internal dependencies
 */
import { store as blocksStore } from '../store';

/** @typedef {import('../store/reducer').WPBlockCategory} WPBlockCategory */

/**
 * Returns all the block categories.
 * Ignored from documentation as the recommended usage is via useSelect from @gutenberg/data.
 *
 * @ignore
 *
 * @return {WPBlockCategory[]} Block categories.
 */
export function getCategories() {
	return select(blocksStore).getCategories();
}

/**
 * Sets the block categories.
 *
 * @param {WPBlockCategory[]} categories Block categories.
 *
 * @example
 * ```js
 * import { __ } from '@gutenberg/i18n';
 * import { store as blocksStore, setCategories } from '@gutenberg/blocks';
 * import { useSelect } from '@gutenberg/data';
 * import { Button } from '@gutenberg/components';
 *
 * const ExampleComponent = () => {
 *     // Retrieve the list of current categories.
 *     const blockCategories = useSelect(
 *         ( select ) => select( blocksStore ).getCategories(),
 *         []
 *     );
 *
 *     return (
 *         <Button
 *             onClick={ () => {
 *                 // Add a custom category to the existing list.
 *                 setCategories( [
 *                     ...blockCategories,
 *                     { title: 'Custom Category', slug: 'custom-category' },
 *                 ] );
 *             } }
 *         >
 *             { __( 'Add a new custom block category' ) }
 *         </Button>
 *     );
 * };
 * ```
 */
export function setCategories(categories) {
	dispatch(blocksStore).setCategories(categories);
}

/**
 * Updates a category.
 *
 * @param {string}          slug     Block category slug.
 * @param {WPBlockCategory} category Object containing the category properties
 *                                   that should be updated.
 *
 * @example
 * ```js
 * import { __ } from '@gutenberg/i18n';
 * import { updateCategory } from '@gutenberg/blocks';
 * import { Button } from '@gutenberg/components';
 *
 * const ExampleComponent = () => {
 *     return (
 *         <Button
 *             onClick={ () => {
 *                 updateCategory( 'text', { title: __( 'Written Word' ) } );
 *             } }
 *         >
 *             { __( 'Update Text category title' ) }
 *         </Button>
 * )    ;
 * };
 * ```
 */
export function updateCategory(slug, category) {
	dispatch(blocksStore).updateCategory(slug, category);
}

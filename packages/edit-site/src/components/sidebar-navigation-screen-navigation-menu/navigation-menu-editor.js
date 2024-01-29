/**
 * WordPress dependencies
 */
import { useMemo } from '@gutenberg/element';
import { useSelect } from '@gutenberg/data';
import { BlockEditorProvider } from '@gutenberg/block-editor';
import { createBlock } from '@gutenberg/blocks';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { store as editSiteStore } from '../../store';
import NavigationMenuContent from '../sidebar-navigation-screen-navigation-menus/navigation-menu-content';

const noop = () => {};

export default function NavigationMenuEditor( { navigationMenuId } ) {
	const { storedSettings } = useSelect( ( select ) => {
		const { getSettings } = unlock( select( editSiteStore ) );

		return {
			storedSettings: getSettings(),
		};
	}, [] );

	const blocks = useMemo( () => {
		if ( ! navigationMenuId ) {
			return [];
		}

		return [ createBlock( 'core/navigation', { ref: navigationMenuId } ) ];
	}, [ navigationMenuId ] );

	if ( ! navigationMenuId || ! blocks?.length ) {
		return null;
	}

	return (
		<BlockEditorProvider
			settings={ storedSettings }
			value={ blocks }
			onChange={ noop }
			onInput={ noop }
		>
			<div className="edit-site-sidebar-navigation-screen-navigation-menus__content">
				<NavigationMenuContent rootClientId={ blocks[ 0 ].clientId } />
			</div>
		</BlockEditorProvider>
	);
}

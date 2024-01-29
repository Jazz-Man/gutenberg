/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@gutenberg/element';
import { useSelect } from '@gutenberg/data';
import { store as coreStore } from '@gutenberg/core-data';
import { __, sprintf } from '@gutenberg/i18n';
import { speak } from '@gutenberg/a11y';
import { decodeEntities } from '@gutenberg/html-entities';
import { privateApis as routerPrivateApis } from '@gutenberg/router';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';

const { useLocation } = unlock( routerPrivateApis );

export default function useTitle( title ) {
	const location = useLocation();
	const siteTitle = useSelect(
		( select ) =>
			select( coreStore ).getEntityRecord( 'root', 'site' )?.title,
		[]
	);
	const isInitialLocationRef = useRef( true );

	useEffect( () => {
		isInitialLocationRef.current = false;
	}, [ location ] );

	useEffect( () => {
		// Don't update or announce the title for initial page load.
		if ( isInitialLocationRef.current ) {
			return;
		}

		if ( title && siteTitle ) {
			// @see https://github.com/WordPress/wordpress-develop/blob/94849898192d271d533e09756007e176feb80697/src/wp-admin/admin-header.php#L67-L68
			const formattedTitle = sprintf(
				/* translators: Admin document title. 1: Admin screen name, 2: Network or site name. */
				__( '%1$s ‹ %2$s ‹ Editor — WordPress' ),
				decodeEntities( title ),
				decodeEntities( siteTitle )
			);

			document.title = formattedTitle;

			// Announce title on route change for screen readers.
			speak( title, 'assertive' );
		}
	}, [ title, siteTitle, location ] );
}

/**
 * WordPress dependencies
 */
import { privateApis as routerPrivateApis } from '@wordpress/router';

/**
 * Internal dependencies
 */
import PagePatterns from '../page-patterns';
import DataviewsPatterns from '../page-patterns/dataviews-patterns';
import PageTemplateParts from '../page-template-parts';
import PageTemplatesTemplateParts from '../page-templates-template-parts';
import PagePages from '../page-pages';
import { unlock } from '../../lock-unlock';
import {
	TEMPLATE_POST_TYPE,
	TEMPLATE_PART_POST_TYPE,
} from '../../utils/constants';

const { useLocation } = unlock( routerPrivateApis );

export default function PageMain() {
	const {
		params: { path },
	} = useLocation();

	if (
		path === '/wp_template/all' ||
		( path === '/wp_template' && window?.__experimentalAdminViews )
	) {
		return <PageTemplatesTemplateParts postType={ TEMPLATE_POST_TYPE } />;
	} else if ( path === '/wp_template_part/all' ) {
		return window?.__experimentalAdminViews ? (
			<PageTemplatesTemplateParts postType={ TEMPLATE_PART_POST_TYPE } />
		) : (
			<PageTemplateParts />
		);
	} else if ( path === '/patterns' ) {
		return window?.__experimentalAdminViews ? (
			<DataviewsPatterns />
		) : (
			<PagePatterns />
		);
	} else if ( window?.__experimentalAdminViews && path === '/page' ) {
		return <PagePages />;
	}

	return null;
}

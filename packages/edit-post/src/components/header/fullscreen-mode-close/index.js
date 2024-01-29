/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useSelect } from '@gutenberg/data';
import {
	Button,
	Icon,
	__unstableMotion as motion,
} from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { addQueryArgs } from '@gutenberg/url';
import { wordpress } from '@gutenberg/icons';
import { store as editorStore } from '@gutenberg/editor';
import { store as coreStore } from '@gutenberg/core-data';
import { useReducedMotion } from '@gutenberg/compose';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../../store';

function FullscreenModeClose( { showTooltip, icon, href } ) {
	const { isActive, isRequestingSiteIcon, postType, siteIconUrl } = useSelect(
		( select ) => {
			const { getCurrentPostType } = select( editorStore );
			const { isFeatureActive } = select( editPostStore );
			const { getEntityRecord, getPostType, isResolving } =
				select( coreStore );
			const siteData =
				getEntityRecord( 'root', '__unstableBase', undefined ) || {};

			return {
				isActive: isFeatureActive( 'fullscreenMode' ),
				isRequestingSiteIcon: isResolving( 'getEntityRecord', [
					'root',
					'__unstableBase',
					undefined,
				] ),
				postType: getPostType( getCurrentPostType() ),
				siteIconUrl: siteData.site_icon_url,
			};
		},
		[]
	);

	const disableMotion = useReducedMotion();

	if ( ! isActive || ! postType ) {
		return null;
	}

	let buttonIcon = <Icon size="36px" icon={ wordpress } />;

	const effect = {
		expand: {
			scale: 1.25,
			transition: { type: 'tween', duration: '0.3' },
		},
	};

	if ( siteIconUrl ) {
		buttonIcon = (
			<motion.img
				variants={ ! disableMotion && effect }
				alt={ __( 'Site Icon' ) }
				className="edit-post-fullscreen-mode-close_site-icon"
				src={ siteIconUrl }
			/>
		);
	}

	if ( isRequestingSiteIcon ) {
		buttonIcon = null;
	}

	// Override default icon if custom icon is provided via props.
	if ( icon ) {
		buttonIcon = <Icon size="36px" icon={ icon } />;
	}

	const classes = classnames( {
		'edit-post-fullscreen-mode-close': true,
		'has-icon': siteIconUrl,
	} );

	return (
		<motion.div whileHover="expand">
			<Button
				className={ classes }
				href={
					href ??
					addQueryArgs( 'edit.php', {
						post_type: postType.slug,
					} )
				}
				label={ postType?.labels?.view_items ?? __( 'Back' ) }
				showTooltip={ showTooltip }
			>
				{ buttonIcon }
			</Button>
		</motion.div>
	);
}

export default FullscreenModeClose;

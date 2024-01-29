/**
 * WordPress dependencies
 */
import {
	PanelBody,
	__experimentalText as Text,
	__experimentalVStack as VStack,
} from '@gutenberg/components';
import { page as pageIcon } from '@gutenberg/icons';
import { __, sprintf } from '@gutenberg/i18n';
import { humanTimeDiff } from '@gutenberg/date';
import { useSelect } from '@gutenberg/data';
import { store as coreStore } from '@gutenberg/core-data';
import { decodeEntities } from '@gutenberg/html-entities';
import {
	PageAttributesPanel,
	PostDiscussionPanel,
	PostExcerptPanel,
	PostFeaturedImagePanel,
	PostLastRevisionPanel,
	PostTaxonomiesPanel,
	store as editorStore,
} from '@gutenberg/editor';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../../store';
import SidebarCard from '../sidebar-card';
import PageContent from './page-content';
import PageSummary from './page-summary';

export default function PagePanels() {
	const {
		id,
		type,
		hasResolved,
		status,
		date,
		password,
		title,
		modified,
		renderingMode,
	} = useSelect( ( select ) => {
		const { getEditedPostContext } = select( editSiteStore );
		const { getEditedEntityRecord, hasFinishedResolution } =
			select( coreStore );
		const { getRenderingMode } = select( editorStore );
		const context = getEditedPostContext();
		const queryArgs = [ 'postType', context.postType, context.postId ];
		const page = getEditedEntityRecord( ...queryArgs );
		return {
			hasResolved: hasFinishedResolution(
				'getEditedEntityRecord',
				queryArgs
			),
			title: page?.title,
			id: page?.id,
			type: page?.type,
			status: page?.status,
			date: page?.date,
			password: page?.password,
			modified: page?.modified,
			renderingMode: getRenderingMode(),
		};
	}, [] );

	if ( ! hasResolved ) {
		return null;
	}

	return (
		<>
			<PanelBody>
				<SidebarCard
					title={ decodeEntities( title ) }
					icon={ pageIcon }
					description={
						<VStack>
							<Text>
								{ sprintf(
									// translators: %s: Human-readable time difference, e.g. "2 days ago".
									__( 'Last edited %s' ),
									humanTimeDiff( modified )
								) }
							</Text>
						</VStack>
					}
				/>
			</PanelBody>
			<PanelBody title={ __( 'Summary' ) }>
				<PageSummary
					status={ status }
					date={ date }
					password={ password }
					postId={ id }
					postType={ type }
				/>
			</PanelBody>
			{ renderingMode !== 'post-only' && (
				<PanelBody title={ __( 'Content' ) }>
					<PageContent />
				</PanelBody>
			) }
			<PostLastRevisionPanel />
			<PostTaxonomiesPanel />
			<PostFeaturedImagePanel />
			<PostExcerptPanel />
			<PostDiscussionPanel />
			<PageAttributesPanel />
		</>
	);
}

/**
 * WordPress dependencies
 */
import { SlotFillProvider } from '@gutenberg/components';
import { useViewportMatch } from '@gutenberg/compose';
import { uploadMedia } from '@gutenberg/media-utils';
import { useDispatch, useSelect } from '@gutenberg/data';
import {
	useEntityBlockEditor,
	store as coreStore,
	useResourcePermissions,
} from '@gutenberg/core-data';
import { useMemo } from '@gutenberg/element';
import { privateApis as blockEditorPrivateApis } from '@gutenberg/block-editor';
import { privateApis as editPatternsPrivateApis } from '@gutenberg/patterns';
import { store as preferencesStore } from '@gutenberg/preferences';

/**
 * Internal dependencies
 */
import KeyboardShortcuts from '../keyboard-shortcuts';
import { buildWidgetAreasPostId, KIND, POST_TYPE } from '../../store/utils';
import useLastSelectedWidgetArea from '../../hooks/use-last-selected-widget-area';
import { store as editWidgetsStore } from '../../store';
import { ALLOW_REUSABLE_BLOCKS } from '../../constants';
import { unlock } from '../../lock-unlock';

const { ExperimentalBlockEditorProvider } = unlock( blockEditorPrivateApis );
const { PatternsMenuItems } = unlock( editPatternsPrivateApis );
export default function WidgetAreasBlockEditorProvider( {
	blockEditorSettings,
	children,
	...props
} ) {
	const mediaPermissions = useResourcePermissions( 'media' );
	const isLargeViewport = useViewportMatch( 'medium' );
	const {
		reusableBlocks,
		isFixedToolbarActive,
		keepCaretInsideBlock,
		pageOnFront,
		pageForPosts,
	} = useSelect( ( select ) => {
		const { canUser, getEntityRecord, getEntityRecords } =
			select( coreStore );
		const siteSettings = canUser( 'read', 'settings' )
			? getEntityRecord( 'root', 'site' )
			: undefined;
		return {
			widgetAreas: select( editWidgetsStore ).getWidgetAreas(),
			widgets: select( editWidgetsStore ).getWidgets(),
			reusableBlocks: ALLOW_REUSABLE_BLOCKS
				? getEntityRecords( 'postType', 'wp_block' )
				: [],
			isFixedToolbarActive: !! select( preferencesStore ).get(
				'core/edit-widgets',
				'fixedToolbar'
			),
			keepCaretInsideBlock: !! select( preferencesStore ).get(
				'core/edit-widgets',
				'keepCaretInsideBlock'
			),
			pageOnFront: siteSettings?.page_on_front,
			pageForPosts: siteSettings?.page_for_posts,
		};
	}, [] );
	const { setIsInserterOpened } = useDispatch( editWidgetsStore );

	const settings = useMemo( () => {
		let mediaUploadBlockEditor;
		if ( mediaPermissions.canCreate ) {
			mediaUploadBlockEditor = ( { onError, ...argumentsObject } ) => {
				uploadMedia( {
					wpAllowedMimeTypes: blockEditorSettings.allowedMimeTypes,
					onError: ( { message } ) => onError( message ),
					...argumentsObject,
				} );
			};
		}
		return {
			...blockEditorSettings,
			__experimentalReusableBlocks: reusableBlocks,
			hasFixedToolbar: isFixedToolbarActive || ! isLargeViewport,
			keepCaretInsideBlock,
			mediaUpload: mediaUploadBlockEditor,
			templateLock: 'all',
			__experimentalSetIsInserterOpened: setIsInserterOpened,
			pageOnFront,
			pageForPosts,
		};
	}, [
		blockEditorSettings,
		isFixedToolbarActive,
		isLargeViewport,
		keepCaretInsideBlock,
		mediaPermissions.canCreate,
		reusableBlocks,
		setIsInserterOpened,
		pageOnFront,
		pageForPosts,
	] );

	const widgetAreaId = useLastSelectedWidgetArea();

	const [ blocks, onInput, onChange ] = useEntityBlockEditor(
		KIND,
		POST_TYPE,
		{ id: buildWidgetAreasPostId() }
	);

	return (
		<SlotFillProvider>
			<KeyboardShortcuts.Register />
			<ExperimentalBlockEditorProvider
				value={ blocks }
				onInput={ onInput }
				onChange={ onChange }
				settings={ settings }
				useSubRegistry={ false }
				{ ...props }
			>
				{ children }
				<PatternsMenuItems rootClientId={ widgetAreaId } />
			</ExperimentalBlockEditorProvider>
		</SlotFillProvider>
	);
}

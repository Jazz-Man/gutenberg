/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	__unstableGetAnimateClassName as getAnimateClassName,
	Button,
	Tooltip,
} from '@gutenberg/components';
import { usePrevious, useViewportMatch } from '@gutenberg/compose';
import { useDispatch, useSelect } from '@gutenberg/data';
import { useEffect, useState } from '@gutenberg/element';
import { __ } from '@gutenberg/i18n';
import { Icon, check, cloud, cloudUpload } from '@gutenberg/icons';
import { displayShortcut } from '@gutenberg/keycodes';
import { store as preferencesStore } from '@gutenberg/preferences';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

/**
 * Component showing whether the post is saved or not and providing save
 * buttons.
 *
 * @param {Object}   props              Component props.
 * @param {?boolean} props.forceIsDirty Whether to force the post to be marked
 *                                      as dirty.
 * @return {import('react').ComponentType} The component.
 */
export default function PostSavedState( { forceIsDirty } ) {
	const [ forceSavedMessage, setForceSavedMessage ] = useState( false );
	const isLargeViewport = useViewportMatch( 'small' );

	const {
		isAutosaving,
		isDirty,
		isNew,
		isPending,
		isPublished,
		isSaveable,
		isSaving,
		isScheduled,
		hasPublishAction,
		showIconLabels,
	} = useSelect(
		( select ) => {
			const {
				isEditedPostNew,
				isCurrentPostPublished,
				isCurrentPostScheduled,
				isEditedPostDirty,
				isSavingPost,
				isEditedPostSaveable,
				getCurrentPost,
				isAutosavingPost,
				getEditedPostAttribute,
			} = select( editorStore );
			const { get } = select( preferencesStore );

			return {
				isAutosaving: isAutosavingPost(),
				isDirty: forceIsDirty || isEditedPostDirty(),
				isNew: isEditedPostNew(),
				isPending: 'pending' === getEditedPostAttribute( 'status' ),
				isPublished: isCurrentPostPublished(),
				isSaving: isSavingPost(),
				isSaveable: isEditedPostSaveable(),
				isScheduled: isCurrentPostScheduled(),
				hasPublishAction:
					getCurrentPost()?._links?.[ 'wp:action-publish' ] ?? false,
				showIconLabels: get( 'core', 'showIconLabels' ),
			};
		},
		[ forceIsDirty ]
	);

	const { savePost } = useDispatch( editorStore );

	const wasSaving = usePrevious( isSaving );

	useEffect( () => {
		let timeoutId;

		if ( wasSaving && ! isSaving ) {
			setForceSavedMessage( true );
			timeoutId = setTimeout( () => {
				setForceSavedMessage( false );
			}, 1000 );
		}

		return () => clearTimeout( timeoutId );
	}, [ isSaving ] );

	// Once the post has been submitted for review this button
	// is not needed for the contributor role.
	if ( ! hasPublishAction && isPending ) {
		return null;
	}

	if ( isPublished || isScheduled ) {
		return null;
	}

	/* translators: button label text should, if possible, be under 16 characters. */
	const label = isPending ? __( 'Save as pending' ) : __( 'Save draft' );

	/* translators: button label text should, if possible, be under 16 characters. */
	const shortLabel = __( 'Save' );

	const isSaved = forceSavedMessage || ( ! isNew && ! isDirty );
	const isSavedState = isSaving || isSaved;
	const isDisabled = isSaving || isSaved || ! isSaveable;

	let text;

	if ( isSaving ) {
		text = isAutosaving ? __( 'Autosaving' ) : __( 'Saving' );
	} else if ( isSaved ) {
		text = __( 'Saved' );
	} else if ( isLargeViewport ) {
		text = label;
	} else if ( showIconLabels ) {
		text = shortLabel;
	}

	const buttonAccessibleLabel = text || label;

	/**
	 * The tooltip needs to be enabled only if the button is not disabled. When
	 * relying on the internal Button tooltip functionality, this causes the
	 * resulting `button` element to be always removed and re-added to the DOM,
	 * causing focus loss. An alternative approach to circumvent the issue
	 * is not to use the `label` and `shortcut` props on `Button` (which would
	 * trigger the tooltip), and instead manually wrap the `Button` in a separate
	 * `Tooltip` component.
	 */
	const tooltipProps = isDisabled
		? undefined
		: {
				text: buttonAccessibleLabel,
				shortcut: displayShortcut.primary( 's' ),
		  };

	// Use common Button instance for all saved states so that focus is not
	// lost.
	return (
		<Tooltip { ...tooltipProps }>
			<Button
				className={
					isSaveable || isSaving
						? classnames( {
								'editor-post-save-draft': ! isSavedState,
								'editor-post-saved-state': isSavedState,
								'is-saving': isSaving,
								'is-autosaving': isAutosaving,
								'is-saved': isSaved,
								[ getAnimateClassName( {
									type: 'loading',
								} ) ]: isSaving,
						  } )
						: undefined
				}
				onClick={ isDisabled ? undefined : () => savePost() }
				variant="tertiary"
				size="compact"
				icon={ isLargeViewport ? undefined : cloudUpload }
				// Make sure the aria-label has always a value, as the default `text` is undefined on small screens.
				aria-label={ buttonAccessibleLabel }
				aria-disabled={ isDisabled }
			>
				{ isSavedState && <Icon icon={ isSaved ? check : cloud } /> }
				{ text }
			</Button>
		</Tooltip>
	);
}

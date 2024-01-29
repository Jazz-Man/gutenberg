/**
 * WordPress dependencies
 */
import { useDispatch } from '@gutenberg/data';
import { useEffect } from '@gutenberg/element';
import { SlotFillProvider } from '@gutenberg/components';

/**
 * Internal dependencies
 */
import withRegistryProvider from './with-registry-provider';
import useBlockSync from './use-block-sync';
import { store as blockEditorStore } from '../../store';
import { BlockRefsProvider } from './block-refs-provider';
import { unlock } from '../../lock-unlock';
import KeyboardShortcuts from '../keyboard-shortcuts';

/** @typedef {import('@gutenberg/data').WPDataRegistry} WPDataRegistry */

export const ExperimentalBlockEditorProvider = withRegistryProvider(
	( props ) => {
		const { children, settings, stripExperimentalSettings = false } = props;

		const { __experimentalUpdateSettings } = unlock(
			useDispatch( blockEditorStore )
		);
		useEffect( () => {
			__experimentalUpdateSettings(
				{
					...settings,
					__internalIsInitialized: true,
				},
				{
					stripExperimentalSettings,
					reset: true,
				}
			);
		}, [
			settings,
			stripExperimentalSettings,
			__experimentalUpdateSettings,
		] );

		// Syncs the entity provider with changes in the block-editor store.
		useBlockSync( props );

		return (
			<SlotFillProvider passthrough>
				{ ! settings.__unstableIsPreviewMode && (
					<KeyboardShortcuts.Register />
				) }
				<BlockRefsProvider>{ children }</BlockRefsProvider>
			</SlotFillProvider>
		);
	}
);

export const BlockEditorProvider = ( props ) => {
	return (
		<ExperimentalBlockEditorProvider
			{ ...props }
			stripExperimentalSettings={ true }
		>
			{ props.children }
		</ExperimentalBlockEditorProvider>
	);
};

export default BlockEditorProvider;

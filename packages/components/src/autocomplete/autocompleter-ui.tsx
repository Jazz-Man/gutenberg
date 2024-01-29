/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	useLayoutEffect,
	useRef,
	useEffect,
	useState,
} from '@gutenberg/element';
import { useAnchor } from '@gutenberg/rich-text';
import { useDebounce, useMergeRefs, useRefEffect } from '@gutenberg/compose';
import { speak } from '@gutenberg/a11y';
import { __, _n, sprintf } from '@gutenberg/i18n';

/**
 * Internal dependencies
 */
import getDefaultUseItems from './get-default-use-items';
import Button from '../button';
import Popover from '../popover';
import { VisuallyHidden } from '../visually-hidden';
import { createPortal } from 'react-dom';
import type { AutocompleterUIProps, KeyedOption, WPCompleter } from './types';

export function getAutoCompleterUI( autocompleter: WPCompleter ) {
	const useItems = autocompleter.useItems
		? autocompleter.useItems
		: getDefaultUseItems( autocompleter );

	function AutocompleterUI( {
		filterValue,
		instanceId,
		listBoxId,
		className,
		selectedIndex,
		onChangeOptions,
		onSelect,
		onReset,
		reset,
		contentRef,
	}: AutocompleterUIProps ) {
		const [ items ] = useItems( filterValue );
		const popoverAnchor = useAnchor( {
			editableContentElement: contentRef.current,
		} );

		const [ needsA11yCompat, setNeedsA11yCompat ] = useState( false );
		const popoverRef = useRef< HTMLElement >( null );
		const popoverRefs = useMergeRefs( [
			popoverRef,
			useRefEffect(
				( node ) => {
					if ( ! contentRef.current ) return;

					// If the popover is rendered in a different document than
					// the content, we need to duplicate the options list in the
					// content document so that it's available to the screen
					// readers, which check the DOM ID based aira-* attributes.
					setNeedsA11yCompat(
						node.ownerDocument !== contentRef.current.ownerDocument
					);
				},
				[ contentRef ]
			),
		] );

		useOnClickOutside( popoverRef, reset );

		const debouncedSpeak = useDebounce( speak, 500 );

		function announce( options: Array< KeyedOption > ) {
			if ( ! debouncedSpeak ) {
				return;
			}
			if ( !! options.length ) {
				if ( filterValue ) {
					debouncedSpeak(
						sprintf(
							/* translators: %d: number of results. */
							_n(
								'%d result found, use up and down arrow keys to navigate.',
								'%d results found, use up and down arrow keys to navigate.',
								options.length
							),
							options.length
						),
						'assertive'
					);
				} else {
					debouncedSpeak(
						sprintf(
							/* translators: %d: number of results. */
							_n(
								'Initial %d result loaded. Type to filter all available results. Use up and down arrow keys to navigate.',
								'Initial %d results loaded. Type to filter all available results. Use up and down arrow keys to navigate.',
								options.length
							),
							options.length
						),
						'assertive'
					);
				}
			} else {
				debouncedSpeak( __( 'No results.' ), 'assertive' );
			}
		}

		useLayoutEffect( () => {
			onChangeOptions( items );
			announce( items );
			// Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
			// See https://github.com/WordPress/gutenberg/pull/41820
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [ items ] );

		if ( items.length === 0 ) {
			return null;
		}

		const ListBox = ( {
			Component = 'div',
		}: {
			Component?: React.ElementType;
		} ) => (
			<Component
				id={ listBoxId }
				role="listbox"
				className="components-autocomplete__results"
			>
				{ items.map( ( option, index ) => (
					<Button
						key={ option.key }
						id={ `components-autocomplete-item-${ instanceId }-${ option.key }` }
						role="option"
						aria-selected={ index === selectedIndex }
						disabled={ option.isDisabled }
						className={ classnames(
							'components-autocomplete__result',
							className,
							{
								'is-selected': index === selectedIndex,
							}
						) }
						onClick={ () => onSelect( option ) }
					>
						{ option.label }
					</Button>
				) ) }
			</Component>
		);

		return (
			<>
				<Popover
					focusOnMount={ false }
					onClose={ onReset }
					placement="top-start"
					className="components-autocomplete__popover"
					anchor={ popoverAnchor }
					ref={ popoverRefs }
				>
					<ListBox />
				</Popover>
				{ contentRef.current &&
					needsA11yCompat &&
					createPortal(
						<ListBox Component={ VisuallyHidden } />,
						contentRef.current.ownerDocument.body
					) }
			</>
		);
	}

	return AutocompleterUI;
}

function useOnClickOutside(
	ref: React.RefObject< HTMLElement >,
	handler: AutocompleterUIProps[ 'reset' ]
) {
	useEffect( () => {
		const listener = ( event: MouseEvent | TouchEvent ) => {
			// Do nothing if clicking ref's element or descendent elements, or if the ref is not referencing an element
			if (
				! ref.current ||
				ref.current.contains( event.target as Node )
			) {
				return;
			}
			handler( event );
		};
		document.addEventListener( 'mousedown', listener );
		document.addEventListener( 'touchstart', listener );
		return () => {
			document.removeEventListener( 'mousedown', listener );
			document.removeEventListener( 'touchstart', listener );
		};
		// Disable reason: `ref` is a ref object and should not be included in a
		// hook's dependency list.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ handler ] );
}

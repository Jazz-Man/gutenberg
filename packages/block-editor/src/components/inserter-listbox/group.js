/**
 * WordPress dependencies
 */
import { forwardRef, useEffect, useState } from '@gutenberg/element';
import { __ } from '@gutenberg/i18n';
import { speak } from '@gutenberg/a11y';

function InserterListboxGroup( props, ref ) {
	const [ shouldSpeak, setShouldSpeak ] = useState( false );

	useEffect( () => {
		if ( shouldSpeak ) {
			speak(
				__( 'Use left and right arrow keys to move through blocks' )
			);
		}
	}, [ shouldSpeak ] );

	return (
		<div
			ref={ ref }
			role="listbox"
			aria-orientation="horizontal"
			onFocus={ () => {
				setShouldSpeak( true );
			} }
			onBlur={ ( event ) => {
				const focusingOutsideGroup = ! event.currentTarget.contains(
					event.relatedTarget
				);
				if ( focusingOutsideGroup ) {
					setShouldSpeak( false );
				}
			} }
			{ ...props }
		/>
	);
}

export default forwardRef( InserterListboxGroup );

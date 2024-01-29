/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';

/**
 * WordPress dependencies
 */
import { RichTextToolbarButton } from '@gutenberg/block-editor';
import {
	TextControl,
	SelectControl,
	Button,
	Popover,
	__experimentalHStack as HStack,
} from '@gutenberg/components';
import { useState } from '@gutenberg/element';
import { applyFormat, removeFormat, useAnchor } from '@gutenberg/rich-text';
import { language as languageIcon } from '@gutenberg/icons';

const name = 'core/language';
const title = __( 'Language' );

export const language = {
	name,
	tagName: 'bdo',
	className: null,
	edit: Edit,
	title,
};

function Edit( { isActive, value, onChange, contentRef } ) {
	const [ isPopoverVisible, setIsPopoverVisible ] = useState( false );
	const togglePopover = () => {
		setIsPopoverVisible( ( state ) => ! state );
	};

	return (
		<>
			<RichTextToolbarButton
				icon={ languageIcon }
				label={ title }
				title={ title }
				onClick={ () => {
					if ( isActive ) {
						onChange( removeFormat( value, name ) );
					} else {
						togglePopover();
					}
				} }
				isActive={ isActive }
				role="menuitemcheckbox"
			/>
			{ isPopoverVisible && (
				<InlineLanguageUI
					value={ value }
					onChange={ onChange }
					onClose={ togglePopover }
					contentRef={ contentRef }
				/>
			) }
		</>
	);
}

function InlineLanguageUI( { value, contentRef, onChange, onClose } ) {
	const popoverAnchor = useAnchor( {
		editableContentElement: contentRef.current,
		settings: language,
	} );

	const [ lang, setLang ] = useState( '' );
	const [ dir, setDir ] = useState( 'ltr' );

	return (
		<Popover
			className="block-editor-format-toolbar__language-popover"
			anchor={ popoverAnchor }
			onClose={ onClose }
		>
			<form
				className="block-editor-format-toolbar__language-container-content"
				onSubmit={ ( event ) => {
					event.preventDefault();
					onChange(
						applyFormat( value, {
							type: name,
							attributes: {
								lang,
								dir,
							},
						} )
					);
					onClose();
				} }
			>
				<TextControl
					label={ title }
					value={ lang }
					onChange={ ( val ) => setLang( val ) }
					help={ __(
						'A valid language attribute, like "en" or "fr".'
					) }
				/>
				<SelectControl
					label={ __( 'Text direction' ) }
					value={ dir }
					options={ [
						{
							label: __( 'Left to right' ),
							value: 'ltr',
						},
						{
							label: __( 'Right to left' ),
							value: 'rtl',
						},
					] }
					onChange={ ( val ) => setDir( val ) }
				/>
				<HStack alignment="right">
					<Button
						variant="primary"
						type="submit"
						text={ __( 'Apply' ) }
					/>
				</HStack>
			</form>
		</Popover>
	);
}

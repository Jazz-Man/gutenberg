/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@gutenberg/data';
import {
	Icon,
	BaseControl,
	TextControl,
	Flex,
	FlexItem,
	FlexBlock,
	Button,
	Modal,
	__experimentalRadioGroup as RadioGroup,
	__experimentalRadio as Radio,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
} from '@gutenberg/components';
import { __ } from '@gutenberg/i18n';
import { useState } from '@gutenberg/element';
import { useInstanceId } from '@gutenberg/compose';
import { store as editorStore } from '@gutenberg/editor';
import { store as noticesStore } from '@gutenberg/notices';
import { store as coreStore } from '@gutenberg/core-data';
import { check } from '@gutenberg/icons';
import { serialize } from '@gutenberg/blocks';

/**
 * Internal dependencies
 */
import {
	TEMPLATE_PART_POST_TYPE,
	TEMPLATE_PART_AREA_DEFAULT_CATEGORY,
} from '../../utils/constants';
import {
	useExistingTemplateParts,
	getUniqueTemplatePartTitle,
	getCleanTemplatePartSlug,
} from '../../utils/template-part-create';

export default function CreateTemplatePartModal( {
	modalTitle = __( 'Create template part' ),
	...restProps
} ) {
	return (
		<Modal
			title={ modalTitle }
			onRequestClose={ restProps.closeModal }
			overlayClassName="edit-site-create-template-part-modal"
		>
			<CreateTemplatePartModalContents { ...restProps } />
		</Modal>
	);
}

export function CreateTemplatePartModalContents( {
	defaultArea = TEMPLATE_PART_AREA_DEFAULT_CATEGORY,
	blocks = [],
	confirmLabel = __( 'Create' ),
	closeModal,
	onCreate,
	onError,
	defaultTitle = '',
} ) {
	const { createErrorNotice } = useDispatch( noticesStore );
	const { saveEntityRecord } = useDispatch( coreStore );
	const existingTemplateParts = useExistingTemplateParts();

	const [ title, setTitle ] = useState( defaultTitle );
	const [ area, setArea ] = useState( defaultArea );
	const [ isSubmitting, setIsSubmitting ] = useState( false );
	const instanceId = useInstanceId( CreateTemplatePartModal );

	const templatePartAreas = useSelect(
		( select ) =>
			select( editorStore ).__experimentalGetDefaultTemplatePartAreas(),
		[]
	);
	async function createTemplatePart() {
		if ( ! title || isSubmitting ) {
			return;
		}

		try {
			setIsSubmitting( true );
			const uniqueTitle = getUniqueTemplatePartTitle(
				title,
				existingTemplateParts
			);
			const cleanSlug = getCleanTemplatePartSlug( uniqueTitle );

			const templatePart = await saveEntityRecord(
				'postType',
				TEMPLATE_PART_POST_TYPE,
				{
					slug: cleanSlug,
					title: uniqueTitle,
					content: serialize( blocks ),
					area,
				},
				{ throwOnError: true }
			);
			await onCreate( templatePart );

			// TODO: Add a success notice?
		} catch ( error ) {
			const errorMessage =
				error.message && error.code !== 'unknown_error'
					? error.message
					: __(
							'An error occurred while creating the template part.'
					  );

			createErrorNotice( errorMessage, { type: 'snackbar' } );

			onError?.();
		} finally {
			setIsSubmitting( false );
		}
	}
	return (
		<form
			onSubmit={ async ( event ) => {
				event.preventDefault();
				await createTemplatePart();
			} }
		>
			<VStack spacing="4">
				<TextControl
					__nextHasNoMarginBottom
					label={ __( 'Name' ) }
					value={ title }
					onChange={ setTitle }
					required
				/>
				<BaseControl
					label={ __( 'Area' ) }
					id={ `edit-site-create-template-part-modal__area-selection-${ instanceId }` }
					className="edit-site-create-template-part-modal__area-base-control"
				>
					<RadioGroup
						label={ __( 'Area' ) }
						className="edit-site-create-template-part-modal__area-radio-group"
						id={ `edit-site-create-template-part-modal__area-selection-${ instanceId }` }
						onChange={ setArea }
						checked={ area }
					>
						{ templatePartAreas.map(
							( { icon, label, area: value, description } ) => (
								<Radio
									key={ label }
									value={ value }
									className="edit-site-create-template-part-modal__area-radio"
								>
									<Flex align="start" justify="start">
										<FlexItem>
											<Icon icon={ icon } />
										</FlexItem>
										<FlexBlock className="edit-site-create-template-part-modal__option-label">
											{ label }
											<div>{ description }</div>
										</FlexBlock>

										<FlexItem className="edit-site-create-template-part-modal__checkbox">
											{ area === value && (
												<Icon icon={ check } />
											) }
										</FlexItem>
									</Flex>
								</Radio>
							)
						) }
					</RadioGroup>
				</BaseControl>
				<HStack justify="right">
					<Button
						variant="tertiary"
						onClick={ () => {
							closeModal();
						} }
					>
						{ __( 'Cancel' ) }
					</Button>
					<Button
						variant="primary"
						type="submit"
						aria-disabled={ ! title || isSubmitting }
						isBusy={ isSubmitting }
					>
						{ confirmLabel }
					</Button>
				</HStack>
			</VStack>
		</form>
	);
}

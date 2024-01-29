/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { useSelect } from '@gutenberg/data';
import { PanelBody, PanelRow } from '@gutenberg/components';
import { store as coreStore } from '@gutenberg/core-data';
import { privateApis as blockEditorPrivateApis } from '@gutenberg/block-editor';
import { useContext } from '@gutenberg/element';

/**
 * Internal dependencies
 */
import EntityRecordItem from './entity-record-item';
import { unlock } from '../../lock-unlock';

const { getGlobalStylesChanges, GlobalStylesContext } = unlock(
	blockEditorPrivateApis
);

function getEntityDescription( entity, count ) {
	switch ( entity ) {
		case 'site':
			return 1 === count
				? __( 'This change will affect your whole site.' )
				: __( 'These changes will affect your whole site.' );
		case 'wp_template':
			return __(
				'This change will affect pages and posts that use this template.'
			);
		case 'page':
		case 'post':
			return __( 'The following content has been modified.' );
	}
}

function GlobalStylesDescription( { record } ) {
	const { user: currentEditorGlobalStyles } =
		useContext( GlobalStylesContext );
	const savedRecord = useSelect(
		( select ) =>
			select( coreStore ).getEntityRecord(
				record.kind,
				record.name,
				record.key
			),
		[ record.kind, record.name, record.key ]
	);

	const globalStylesChanges = getGlobalStylesChanges(
		currentEditorGlobalStyles,
		savedRecord,
		{
			maxResults: 10,
		}
	);
	return globalStylesChanges.length ? (
		<>
			<h3 className="entities-saved-states__description-heading">
				{ __( 'Changes made to:' ) }
			</h3>
			<PanelRow>{ globalStylesChanges.join( ', ' ) }</PanelRow>
		</>
	) : null;
}

function EntityDescription( { record, count } ) {
	if ( 'globalStyles' === record?.name ) {
		return <GlobalStylesDescription record={ record } />;
	}
	const description = getEntityDescription( record?.name, count );
	return description ? <PanelRow>{ description }</PanelRow> : null;
}

export default function EntityTypeList( {
	list,
	unselectedEntities,
	setUnselectedEntities,
} ) {
	const count = list.length;
	const firstRecord = list[ 0 ];
	const entityConfig = useSelect(
		( select ) =>
			select( coreStore ).getEntityConfig(
				firstRecord.kind,
				firstRecord.name
			),
		[ firstRecord.kind, firstRecord.name ]
	);

	let entityLabel = entityConfig.label;
	if ( firstRecord?.name === 'wp_template_part' ) {
		entityLabel =
			1 === count ? __( 'Template Part' ) : __( 'Template Parts' );
	}

	return (
		<PanelBody title={ entityLabel } initialOpen={ true }>
			<EntityDescription record={ firstRecord } count={ count } />
			{ list.map( ( record ) => {
				return (
					<EntityRecordItem
						key={ record.key || record.property }
						record={ record }
						checked={
							! unselectedEntities.some(
								( elt ) =>
									elt.kind === record.kind &&
									elt.name === record.name &&
									elt.key === record.key &&
									elt.property === record.property
							)
						}
						onChange={ ( value ) =>
							setUnselectedEntities( record, value )
						}
					/>
				);
			} ) }
		</PanelBody>
	);
}

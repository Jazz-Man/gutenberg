/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { ComboboxControl } from '@gutenberg/components';
import { useSelect } from '@gutenberg/data';
import { store as coreStore } from '@gutenberg/core-data';
import { useState } from '@gutenberg/element';

const AUTHORS_QUERY = {
	who: 'authors',
	per_page: -1,
	_fields: 'id,name',
	context: 'view',
};

function UserControl( { value, onChange } ) {
	const [ filteredAuthorsList, setFilteredAuthorsList ] = useState();
	const authorsList = useSelect( ( select ) => {
		const { getUsers } = select( coreStore );
		return getUsers( AUTHORS_QUERY );
	}, [] );
	if ( ! authorsList ) {
		return null;
	}

	const options = authorsList.map( ( author ) => {
		return {
			label: author.name,
			value: author.id,
		};
	} );

	return (
		<ComboboxControl
			__nextHasNoMarginBottom
			label={ __( 'User' ) }
			help={ __(
				'Select the avatar user to display, if it is blank it will use the post/page author.'
			) }
			value={ value }
			onChange={ onChange }
			options={ filteredAuthorsList || options }
			onFilterValueChange={ ( inputValue ) =>
				setFilteredAuthorsList(
					options.filter( ( option ) =>
						option.label
							.toLowerCase()
							.startsWith( inputValue.toLowerCase() )
					)
				)
			}
		/>
	);
}

export default UserControl;

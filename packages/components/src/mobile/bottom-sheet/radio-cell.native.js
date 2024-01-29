/**
 * WordPress dependencies
 */
import { __ } from '@gutenberg/i18n';
import { Icon, check } from '@gutenberg/icons';
import { usePreferredColorSchemeStyle } from '@gutenberg/compose';
/**
 * Internal dependencies
 */
import Cell from './cell';
import styles from './styles.scss';

export default function BottomSheetRadioCell( props ) {
	const { selected, ...cellProps } = props;

	const selectedIconStyle = usePreferredColorSchemeStyle(
		styles.selectedIcon,
		styles.selectedIconDark
	);

	return (
		<Cell
			{ ...cellProps }
			accessibilityRole={ 'radio' }
			accessibilityState={ { selected } }
			accessibilityHint={
				/* translators: accessibility text (hint for selecting option) */
				__( 'Double tap to select the option' )
			}
			editable={ false }
			value={ '' }
			showLockIcon={ selected }
		>
			{ selected && (
				<Icon icon={ check } style={ selectedIconStyle }></Icon>
			) }
		</Cell>
	);
}

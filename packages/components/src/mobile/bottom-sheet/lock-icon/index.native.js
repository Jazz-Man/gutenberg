/**
 * WordPress dependencies
 */
import { Icon, lock } from '@gutenberg/icons';
import { usePreferredColorSchemeStyle } from '@gutenberg/compose';

/**
 * Internal dependencies
 */
import styles from './styles.scss';

export default function LockIcon() {
	const iconStyle = usePreferredColorSchemeStyle(
		styles.icon,
		styles[ 'icon--dark' ]
	);

	return <Icon icon={ lock } color={ iconStyle.color } style={ iconStyle } />;
}

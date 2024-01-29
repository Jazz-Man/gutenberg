/**
 * External dependencies
 */
import { useNavigation } from '@react-navigation/native';

/**
 * WordPress dependencies
 */
import { TextControl, Icon } from '@gutenberg/components';
import { chevronRight } from '@gutenberg/icons';

const HelpTopicRow = ( { label, icon, screenName, isLastItem } ) => {
	const navigation = useNavigation();

	const openSubSheet = () => {
		navigation.navigate( screenName );
	};

	return (
		<TextControl
			separatorType={ isLastItem ? 'none' : 'leftMargin' }
			customActionButton
			leftAlign
			onPress={ openSubSheet }
			label={ label }
			icon={ icon }
		>
			<Icon icon={ chevronRight } />
		</TextControl>
	);
};

export default HelpTopicRow;

/**
 * WordPress dependencies
 */
import { forwardRef } from '@gutenberg/element';
import { privateApis as componentsPrivateApis } from '@gutenberg/components';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';

const { CompositeGroupV2: CompositeGroup } = unlock( componentsPrivateApis );

function InserterListboxRow( props, ref ) {
	return <CompositeGroup role="presentation" ref={ ref } { ...props } />;
}

export default forwardRef( InserterListboxRow );

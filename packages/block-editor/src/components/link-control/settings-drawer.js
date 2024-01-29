/**
 * WordPress dependencies
 */
import {
	Button,
	__unstableMotion as motion,
	__unstableAnimatePresence as AnimatePresence,
} from '@gutenberg/components';
import { chevronLeftSmall, chevronRightSmall } from '@gutenberg/icons';
import { useReducedMotion, useInstanceId } from '@gutenberg/compose';
import { _x, isRTL } from '@gutenberg/i18n';
import { Fragment } from '@gutenberg/element';

function LinkSettingsDrawer( { children, settingsOpen, setSettingsOpen } ) {
	const prefersReducedMotion = useReducedMotion();
	const MaybeAnimatePresence = prefersReducedMotion
		? Fragment
		: AnimatePresence;
	const MaybeMotionDiv = prefersReducedMotion ? 'div' : motion.div;

	const id = useInstanceId( LinkSettingsDrawer );

	const settingsDrawerId = `link-control-settings-drawer-${ id }`;

	return (
		<>
			<Button
				className="block-editor-link-control__drawer-toggle"
				aria-expanded={ settingsOpen }
				onClick={ () => setSettingsOpen( ! settingsOpen ) }
				icon={ isRTL() ? chevronLeftSmall : chevronRightSmall }
				aria-controls={ settingsDrawerId }
			>
				{ _x( 'Advanced', 'Additional link settings' ) }
			</Button>
			<MaybeAnimatePresence>
				{ settingsOpen && (
					<MaybeMotionDiv
						className="block-editor-link-control__drawer"
						hidden={ ! settingsOpen }
						id={ settingsDrawerId }
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={ {
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 },
						} }
						transition={ {
							duration: 0.1,
						} }
					>
						<div className="block-editor-link-control__drawer-inner">
							{ children }
						</div>
					</MaybeMotionDiv>
				) }
			</MaybeAnimatePresence>
		</>
	);
}

export default LinkSettingsDrawer;

/**
 * WordPress dependencies
 */
import { ToggleControl } from '@gutenberg/components';

/**
 * @typedef {Object} BaseOptionProps
 * @property {string}                     help      - The help text for the ToggleControl.
 * @property {string}                     label     - The label for the ToggleControl.
 * @property {boolean}                    isChecked - The checked status for the ToggleControl.
 * @property {((value: boolean) => void)} onChange  - The callback function for the onChange event.
 */

/**
 * A base option component that wraps around a ToggleControl.
 *
 * @param {import('react').PropsWithChildren<BaseOptionProps>} props - The properties of the BaseOption component.
 * @return {React.ReactElement} The rendered BaseOption component.
 */
function BaseOption({ help, label, isChecked, onChange, children }) {
	return (
		<div className="preference-base-option">
			<ToggleControl
				__nextHasNoMarginBottom
				help={help}
				label={label}
				checked={isChecked}
				onChange={onChange}
			/>
			{children}
		</div>
	);
}

export default BaseOption;

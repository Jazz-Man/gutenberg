/**
 * WordPress dependencies
 */
import {
	createContext,
	useState,
	useEffect,
	useContext,
} from '@gutenberg/element';

/**
 * Internal dependencies
 */
import history from './history';

/**
 * @typedef {import('history').Location} HistoryLocation
 * @typedef {import('history').BrowserHistory | any} HistoryLocationContext
 * @typedef {HistoryLocation & {params: Record<string,any>} | any} RoutesContextType
 */

/**
 * Context for storing the current route.
 * @type {React.Context<RoutesContextType>}
 */
const RoutesContext = createContext(undefined);

/**
 * Context for storing the navigation history.
 * @type {React.Context<HistoryLocationContext>}
 */
const HistoryContext = createContext(undefined);

/**
 * Custom hook to access the current location.
 *
 * @return {RoutesContextType} The current location object.
 */
export function useLocation() {
	return useContext(RoutesContext);
}

/**
 *
 * Custom hook to access the navigation history.
 *
 * @return {HistoryLocationContext}
 */
export function useHistory() {
	return useContext(HistoryContext);
}

/**
 * Enhances the location object with additional parameters.
 *
 * @param {HistoryLocation} location - The current location object.
 * @return {RoutesContextType} The enhanced location object.
 */
function getLocationWithParams(location) {
	const searchParams = new URLSearchParams(location.search);
	return {
		...location,
		params: Object.fromEntries(searchParams.entries()),
	};
}

/**
 * Provider component for managing the router state.
 *
 * @param {import('react').PropsWithChildren} props - The component props.
 * @return {import('react').ReactElement} The rendered RouterProvider component.
 */
export function RouterProvider({ children }) {
	const [location, setLocation] = useState(() =>
		getLocationWithParams(history.location)
	);

	useEffect(() => {
		// Listen for changes in the navigation history.
		return history.listen(({ location: updatedLocation }) => {
			setLocation(getLocationWithParams(updatedLocation));
		});
	}, []);

	return (
		<HistoryContext.Provider value={history}>
			<RoutesContext.Provider value={location}>
				{children}
			</RoutesContext.Provider>
		</HistoryContext.Provider>
	);
}

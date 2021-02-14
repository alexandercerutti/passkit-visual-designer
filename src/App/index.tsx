import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import thunk from "redux-thunk";
import localForage from "localforage";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import PassSelector from "../PassSelector";
import { createStore, applyMiddleware } from "redux";
import SmoothRouter from "./SmoothRouter";
import Configurator from "../Configurator";
import { PKTextAlignment } from "../Pass/constants";
import * as Store from "../store";
import RecentSelector from "../RecentSelector";
import LoaderFace from "../Loader";
import { CSSTransition } from "react-transition-group";
import { MediaProps, PassMixedProps } from "../Pass";
import { CollectionSet } from "../store";

// Webpack valorized
declare const isDevelopment: boolean;

const store = createStore(Store.reducers,
	Store.initialState,
	composeWithDevTools(
		applyMiddleware(
			Store.middlewares.CreationMiddleware,
			Store.middlewares.CollectionEditUrlMiddleware,
			Store.middlewares.CollectionActivationMiddleware,
			Store.middlewares.PurgeMiddleware
		),
		applyMiddleware(thunk),
		/** Order here is important. We want to execute next mid after thunks */
		applyMiddleware(Store.middlewares.LocalForageSaveMiddleware)
	)
);

export default function App(): JSX.Element {
	const [forageData, setForageData] = React.useState<Store.Forage.ForageStructure>();
	const [isLoading, setLoading] = React.useState(true);

	React.useLayoutEffect(() => {
		window.addEventListener("popstate", (event) => {
			setLoading(true);
			setTimeout(() => {
				/**
				 * Delaying dispatch to avoid seeing pass reset
				 * before the loader showing begins
				 */
				store.dispatch(Store.Forage.Reset());
				setLoading(false)
			}, 500);
		});

		/**
		 * Removing previously created records.
		 * Otherwise we might occour in orphan blob
		 * urls when the page is reloaded or
		 * restored.
		 */

		sessionStorage.clear();
	}, []);

	const refreshForageCallback = React.useCallback(async () => {
		const slices: (keyof Store.Forage.ForageStructure)[] = ["projects"];

		const data = Object.assign({},
			...(await Promise.all(
				slices.map((slice) => localForage.getItem<Store.Forage.ForageStructure[typeof slice]>(slice))
			))
				.map((data, index) => ({ [slices[index]]: data }))
		) as Store.Forage.ForageStructure;

		setForageData(data);
	}, []);

	React.useEffect(() => {
		refreshForageCallback();
		window.setTimeout(setLoading, 1000, false);
	}, []);

	const initializeStore = React.useCallback(async (projectID: string) => {
		sessionStorage.clear();
		setLoading(true);

		return new Promise<void>(resolve => {
			/**
			 * Trick to show loader, so if this takes a bit of time,
			 * UI doesn't seems to be stuck.
			 * @TODO Actually, what would be better is not firing Init until
			 * we are not sure that resolutions URLs have been generated.
			 * For the moment we are using the same normal flow, through
			 * middlewares.
			 */

			setTimeout(() => {
				const { snapshot } = forageData.projects[projectID];
				store.dispatch(Store.Forage.Init(snapshot));

				/** Iterating through medias so we can create and set URLs for array buffers */

				const availableMediaLanguages = Object.entries(snapshot.media);

				for (let i = availableMediaLanguages.length, localized: typeof availableMediaLanguages[0]; localized = availableMediaLanguages[--i];) {
					const [language, mediaSet] = localized;
					const mediaEntries = Object.entries(mediaSet) as [keyof MediaProps, CollectionSet][];

					for (let i = mediaEntries.length, mediaEntry: typeof mediaEntries[0]; mediaEntry = mediaEntries[--i];) {
						const [mediaName, collectionSet] = mediaEntry;
						const collectionEntries = Object.entries(collectionSet.collections);

						for (let i = collectionEntries.length, collectionEntry: typeof collectionEntries[0]; collectionEntry = collectionEntries[--i];) {
							const [collectionID, collection] = collectionEntry;

							store.dispatch(Store.Media.EditCollection(mediaName, language, collectionID, collection));
						}
					}
				}

				resolve();
				setLoading(false);
			}, 500);
		});
	}, [forageData?.projects]);

	return (
		<Provider store={store}>
			<CSSTransition
				mountOnEnter
				unmountOnExit
				in={isLoading}
				timeout={1000}
			>
				<LoaderFace />
			</CSSTransition>
			<SmoothRouter>
				<Route path="/" exact>
					<RecentSelector
						recentProjects={forageData?.projects ?? {}}
						requestForageDataRequest={refreshForageCallback}
						initStore={initializeStore}
					/>
				</Route>
				<Route path="/select">
					{() => !isDevelopment && Object.keys(forageData?.projects).length
						? <Redirect to="/" />
						: <PassSelector />
					}
				</Route>
				<Route path="/creator">
					{() => !(isDevelopment || store.getState()?.pass?.kind)
						? <Redirect to="/select" />
						: <Configurator />
					}
				</Route>
				<Route component={null} />
			</SmoothRouter>
		</Provider>
	);
}

// Sample data

/*
const sampleData = {
	media: {
		logoText: "blablabla",
		headerFields: [
			{
				label: "Data",
				key: "departing_date",
				value: "10/04/1996",
			}, {
				label: "Ora",
				key: "departing_time",
				value: "10:30",
			}, {
				label: "test",
				key: "departing_time",
				value: "10:30",
			}
		],
		// BoardingPass
		primaryFields: [
			{
				key: "starting_point",
				value: "ARN",
				label: "stockholm-arlanda"
			}, {
				key: "finish_point",
				value: "CPH",
				label: "copenhagen t2"
			}
		],
		// Coupon
		// primaryFields: [
		// 	{
		// 		fieldKey: "starting_point",
		// 		value: "21,75 USD",
		// 		label: "remaining balance"
		// 	}
		// ],
		// Event Ticket
		// primaryFields: [
		// 	{
		// 		"fieldKey": "event",
		// 		"label": "EVENT",
		// 		"value": "The Beat Goes On"
		// 	}
		// ],
		auxiliaryFields: [
			{
				key: "passenger",
				label: "passeggero",
				value: "Alexander Patrick Cerutti"
			},
			{
				key: "flight",
				label: "n. volo",
				value: "FR1328"
			},
			{
				key: "seq",
				label: "sequenza",
				value: "8"
			}
		],
		// Primary Fields
		secondaryFields: [
			{
				"key": "gateClose",
				"label": "Il Gate Chiude",
				"dateStyle": PKDateStyle.None,
				"timeStyle": PKDateStyle.Short,
				"value": "09:20"
			},
			{
				"key": "queue",
				"label": "Fila",
				"value": "Priorità"
			},
			{
				"key": "seat",
				"label": "Posto*",
				"value": "16C"
			}
		],
		// Event Ticket
		// secondaryFields: [
		// 	{
		// 		"fieldKey": "loc",
		// 		"label": "LOCATION",
		// 		"value": "Moscone West"
		// 	}
		// ],
	}
};
*/

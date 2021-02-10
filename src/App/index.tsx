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

// Webpack valorized
declare const isDevelopment: boolean;

const store = createStore(Store.reducers,
	Store.initialState,
	composeWithDevTools(
		applyMiddleware(
			Store.middlewares.CreationMiddleware,
			Store.middlewares.CollectionEditUrlMiddleware,
			Store.middlewares.CollectionActivationMiddleware,
			Store.middlewares.LanguageSelectionMiddleware,
			Store.middlewares.PurgeMiddleware
		),
		applyMiddleware(thunk),
		/** Order here is important. We want to execute next mid after thunks */
		applyMiddleware(Store.middlewares.LocalForageSaveMiddleware)
	)
);

export default function App(): JSX.Element {
	const [forageData, setForageData] = React.useState<Store.Forage.ForageStructure>();

	React.useLayoutEffect(() => {
		window.addEventListener("popstate", (event) => {
			store.dispatch(Store.Forage.Reset());
		});
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

	React.useEffect(() => void refreshForageCallback(), []);

	return (
		<Provider store={store}>
			<CSSTransition
				mountOnEnter
				unmountOnExit
				in={!forageData}
				timeout={1000}
			>
				<LoaderFace />
			</CSSTransition>
			<SmoothRouter>
				<Route path="/" exact>
					<RecentSelector
						recentProjects={forageData?.projects ?? {}}
						requestForageDataRequest={refreshForageCallback}
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

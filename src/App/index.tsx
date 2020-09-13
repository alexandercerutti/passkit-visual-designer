import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import PassSelector from "../PassSelector";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "../store/reducers";
import SmoothRouter from "./SmoothRouter";
import Configurator from "../Configurator";
import { composeWithDevTools } from "redux-devtools-extension";
import { PKTextAlignment } from "../Pass/constants";
import thunk from "redux-thunk";
import URLMiddleware from "../store/urlMiddleware";

// Webpack valorized
declare const isDevelopment: boolean;

const store = createStore(reducers,
	// preloadedState,
	composeWithDevTools(
		applyMiddleware(URLMiddleware),
		applyMiddleware(thunk),
	)
);

export default function App(): JSX.Element {
	/* 		{
				media: { */
	/*logoText: "blablabla",*/
	/*headerFields: [
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
	],*/
	// BoardingPass
	/*primaryFields: [
		{
			key: "starting_point",
			value: "ARN",
			label: "stockholm-arlanda"
		}, {
			key: "finish_point",
			value: "CPH",
			label: "copenhagen t2"
		}
	],*/
	// Coupon
	/*primaryFields: [
		{
			fieldKey: "starting_point",
			value: "21,75 USD",
			label: "remaining balance"
		}
	],*/
	// Event Ticket
	/*primaryFields: [
		{
			"fieldKey": "event",
			"label": "EVENT",
			"value": "The Beat Goes On"
		}
	]*/
	/*auxiliaryFields: [
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
	],*/
	// Primary Fields
	/*secondaryFields: [
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
	] */
	// Event Ticket
	/*secondaryFields: [
		{
			"fieldKey": "loc",
			"label": "LOCATION",
			"value": "Moscone West"
		}
	],*/
/* 			}
			}
		)); */

	return (
		<Provider store={store}>
			<SmoothRouter>
				<Route path="/" exact>
					{null}
				</Route>
				<Route path="/select">
					<PassSelector />
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

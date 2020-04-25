import * as React from "react";
import { Route } from "react-router-dom";
import PassSelector from "../PassSelector";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../store/reducers";
import SmoothRouter from "./SmoothRouter";
import Configurator from "../Configurator";

export default class App extends React.Component {
	store = createStore(reducers);

	render() {
		return (
			<Provider store={this.store}>
				<SmoothRouter>
					<Route path="/" exact>
						{null}
					</Route>
					<Route path="/select">
						<PassSelector />
					</Route>
					<Route path="/creator">
						<Configurator />
					</Route>
					<Route component={null} />
				</SmoothRouter>
			</Provider>
		);
	}
}

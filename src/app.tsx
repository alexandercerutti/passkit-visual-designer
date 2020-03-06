import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Pass from "./passes/PassCore";
import { PassSelector } from "./PassSelector";
import { PassKind } from "./model";

interface AppState {
	phase: number;
	selectedPassKind?: PassKind
}

export default class App extends React.Component<{}, AppState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			phase: 0,
			selectedPassKind: null
		};

		this.onPassKindSelection = this.onPassKindSelection.bind(this);
	}

	/**
	 * Sets selected kind in the global scope
	 * @param selectedPassKind
	 */

	onPassKindSelection(selectedPassKind: PassKind) {
		this.setState({ selectedPassKind });
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact>
						{null}
					</Route>
					<Route path="/select">
						<PassSelector
							onPassKindSelection={this.onPassKindSelection}
						/>
					</Route>
					<Route path="/create">
						{null}
					</Route>
					<Route component={null} />
				</Switch>
			</Router>
		);
	}
}

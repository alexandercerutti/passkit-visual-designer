import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Pass from "./passes/base";
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
				<div style={{ margin: 0, padding: 0, backgroundColor: "#333" }}>
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
				</div>
			</Router>
		);
	}
}

class PassArea extends React.Component {
	passTypes = ["boardingPass", "eventTicket", "coupon", "generic", "storeCard"];

	constructor(props: any) {
		super(props);

		this.onPassClick = this.onPassClick.bind(this);
	}

	onPassClick() {
		console.log("PASS CLICKED")
	}

	render() {
		const passes = this.passTypes.map((pass) => (
			<Pass key={pass} /*type={pass}*/ /*onClick={this.onPassClick}*/ />
		));

		return (
			<div className="selector">
				{passes}
			</div>
		);
	}
}

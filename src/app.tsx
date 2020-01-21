import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Pass from "./passes/base";

interface AppState {
	phase: number;
}

export default class App extends React.Component<{}, AppState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			phase: 0
		};
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
							{null}
						</Route>
						<Route path="/create">
							{null}
						</Route>
						<Route component={null} />
					</Switch>
				</div>
			</Router>
			/* 			<div id="app">
							<div id="right">
								<h2>{this.state.phaseText}</h2>
								<PassArea />
							</div>
							<Configurator />
						</div> */
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

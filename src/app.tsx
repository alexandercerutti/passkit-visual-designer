import * as React from "react";
import Pass from "./pass";

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
		// if (this.state.phase === 0) {
		// 	return
		// }

		return (
			<div id="app">
				<PassArea />
				<Configurator />
			</div>
		);
	}
}

interface ConfiguratorProps {
	visible?: boolean
}

class Configurator extends React.Component<ConfiguratorProps, {}> {
	render(): JSX.Element {
		return (
			<div id="configurator" style={{ width: this.props.visible ? "300px" : "0"}}>
				<h1>Configurator</h1>
			</div>
		);
	}
}

class PassArea extends React.Component {
	passTypes = ["boardingPass", "eventTicket", "coupon", "generic", "storeCard"];

	constructor(props: {}) {
		super(props);

		this.onPassClick = this.onPassClick.bind(this);
	}

	onPassClick() {
		console.log("PASS CLICKED")
	}

	render() {
		const passes = this.passTypes.map((pass) => (
			<Pass key={pass} type={pass} onClick={this.onPassClick} />
		));

		return (
			<div className="selector">
				{passes}
			</div>
		);
	}
}

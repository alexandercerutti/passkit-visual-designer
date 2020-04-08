import * as React from "react";
import "./style.less";
import Viewer from "./Viewer";
import OptionsBar from "./OptionsBar";
import OptionsMenu from "./OptionsMenu";

interface ConfiguratorProps { }

export default class Configurator extends React.Component<ConfiguratorProps> {
	constructor(props: ConfiguratorProps) {
		super(props);
	}

	render() {
		return (
			<div id="configurator">
				<div className="screen">
					<Viewer />
					<OptionsBar />
				</div>
				<div className="config-panel">
					<OptionsMenu />
				</div>
			</div>
		);
	}
}

import * as React from "react";
import "./style.less";
import App from "../app";

interface SelectorProps {
	onPassKindSelection: App["onPassKindSelection"];
}

export class PassSelector extends React.Component<SelectorProps> {
	private config = {
		introText: "Select your pass model"
	};

	constructor(props: SelectorProps) {
		super(props);
	}

	render() {
		return (
			<div id="selector">
				<h2>{this.config.introText}</h2>
			</div>
		);
	}
}

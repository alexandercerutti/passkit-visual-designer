import * as React from "react";
import "./style.less";
import App from "../app";
import { PassKind } from "../model";
import Pass from "../passes/base";

interface SelectorProps {
	onPassKindSelection: App["onPassKindSelection"];
}

export class PassSelector extends React.PureComponent<SelectorProps> {
	private config = {
		introText: "Select your pass model"
	};

	constructor(props: SelectorProps) {
		super(props);
	}

	render() {
		const passes = Object.keys(PassKind).map((pass) => (
			<Pass key={PassKind[pass]} onClick={(e) => this.props.onPassKindSelection(PassKind[pass])} />
		));

		return (
			<div id="selector">
				<h2>{this.config.introText}</h2>
				{passes}
			</div>
		);
	}
}

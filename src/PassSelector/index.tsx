import * as React from "react";
import "./style.less";
import App from "../app";
import { PassKind } from "../model";
import Pass from "../passes/base";
import withClickEvent from "./withClickEvent";

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
		const passes = Object.keys(PassKind).map((pass) => {
			const ClickablePass = withClickEvent(Pass, () => this.props.onPassKindSelection(PassKind[pass]));
			return (
				<ClickablePass
					key={PassKind[pass]}
					onClick={(e) => {
						e.stopPropagation();
						this.props.onPassKindSelection(PassKind[pass])
					}}
					kind={PassKind[pass]}
				/>
			);
		});

		return (
			<div id="selectorApp">
				<h2>{this.config.introText}</h2>
				<div id="passSelection">
					{passes}
				</div>
			</div>
		);
	}
}

import * as React from "react";
import "./style.less";
import App from "../app";
import { PassKind } from "../model";
import Pass from "../passes/PassCore";
import withClickEvent from "./withClickEvent";
import PassList from "./PassList";

interface SelectorProps {
	onPassKindSelection: App["onPassKindSelection"];
}

export interface PassAlternative {
	name: string;
	specificProps: Object;
}

type PassAlternativesIndex = { [key in PassKind]: PassAlternative[] };

export class PassSelector extends React.PureComponent<SelectorProps> {
	private alternatives: PassAlternativesIndex = {} as PassAlternativesIndex;

	private config = {
		introText: "Select your pass model"
	};

	constructor(props: SelectorProps) {
		super(props);
	}

	/**
	 * This methods will be passed to passes. They will invoke it
	 * and register all the possible alternatives of the same
	 * model (e.g. Boarding Pass + Generic / Boat / Air ...)
	 *
	 * @param kind
	 * @param alternatives
	 */

	registerAlternatives(kind: PassKind, ...alternatives: PassAlternative[]) {
		this.alternatives[kind] = alternatives;
		console.log("Registering alternatives for", kind, alternatives);
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
					registerAlternatives={this.registerAlternatives.bind(this, PassKind[pass])}
				/>
			);
		});

		return (
			<div id="selector-app" >
				<header>
				<h2>{this.config.introText}</h2>
				</header>
				<PassList onPassSelect={this.onPassSelect}>
					{passes}
				</PassList>
				{/* {AlternativesListComponent} */}
			</div>
		);
	}
}

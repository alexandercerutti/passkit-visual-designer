import * as React from "react";
import "./style.less";
import App from "../app";
import { PassKind } from "../model";
import PassList from "./PassList";
import NamedPass from "./NamedPass";

interface SelectorProps {
	onPassKindSelection: App["onPassKindSelection"];
}

export interface PassAlternative {
	name: string;
	specificProps: Object;
	default?: boolean;
}

type PassAlternativesIndex = { [key in PassKind]: PassAlternative[] };

class PassSelector extends React.PureComponent<SelectorProps> {
	private alternatives: PassAlternativesIndex = {} as PassAlternativesIndex;

	private config = {
		introText: "Select your pass model"
	};

	constructor(props: SelectorProps) {
		super(props);

		this.registerAlternatives = this.registerAlternatives.bind(this);
		this.onPassSelect = this.onPassSelect.bind(this);

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
		const { selectedPasses: [firstPassKind] } = this.props;
		const availableAlternatives = firstPassKind && this.alternatives[firstPassKind] || [];

		const passes = Object.keys(PassKind).map((pass: keyof typeof PassKind) => {
			return (
				<NamedPass
					key={PassKind[pass]}
					name={PassKind[pass]}
					kind={PassKind[pass]}
					registerAlternatives={this.registerAlternatives.bind(this, PassKind[pass])}
				/>
			);
		});

		const alternativesList = availableAlternatives.length && (
			availableAlternatives.map((alternative: PassAlternative) => {
				return (
					<NamedPass
						key={alternative.name}
						name={alternative.name}
						kind={firstPassKind}
						registerAlternatives={this.registerAlternatives.bind(this, firstPassKind)}
						isDefault={alternative.default || false}
						{...alternative.specificProps}
					/>
				);
			})
		) || null;

		const AlternativesListComponent = (
			<PassList requiresAttention row={2} onPassSelect={this.onPassSelect}>
				{alternativesList}
			</PassList>
		) || null;

		return (
			<div id="selector-app" >
				<header>
					<h2>{this.config.introText}</h2>
				</header>
				<div className="selection-window">
					<PassList row={1} onPassSelect={this.onPassSelect}>
						{passes}
					</PassList>
					{AlternativesListComponent}
				</div>
			</div>
		);
	}
}

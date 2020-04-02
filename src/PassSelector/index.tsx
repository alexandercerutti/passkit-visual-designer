import * as React from "react";
import { connect } from "react-redux";
import "./style.less";
import App from "../app";
import { PassKind } from "../model";
import PassList from "./PassList";
import { selectPassKind, selectPassAlternative } from "../store/actions";
import { State } from "../store/state";
import NamedPass from "./NamedPass";

interface DispatchProps {
	selectPassKind: typeof selectPassKind,
	selectPassAlternative: typeof selectPassAlternative,
}

interface StoreProps {
	selectedPassKind: PassKind;
}

interface SelectorProps extends DispatchProps, StoreProps {
	onPassKindSelection: App["onPassKindSelection"];
}

export interface PassAlternative {
	name: string;
	specificProps: Object;
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
		this.onAlternativeSelection = this.onAlternativeSelection.bind(this);

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

	onPassSelect(kind: PassKind) {
		console.log("Performed selection of", kind);

		this.props.selectPassKind(kind);

		// @TODO: Select pass and call function
		// from parent to pass to the next area

		console.log("Performing next action...");
	}

	onAlternativeSelection() {
		console.log("Performed second selection of pass");
		this.props.selectPassAlternative();
	}

	render() {
		const { selectedPassKind } = this.props;
		const availableAlternatives = selectedPassKind && this.alternatives[selectedPassKind] || [];

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
						kind={selectedPassKind}
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
			<div id="selector-app">
				<header>
					<h2>{this.config.introText}</h2>
				</header>
				<div className="selection-window">
					<PassList row={1} onPassSelect={this.onPassSelect} selectedKind={selectedPassKind}>
						{passes}
					</PassList>
					{AlternativesListComponent}
				</div>
			</div>
		);
	}
}

export default connect(
	(state: State): StoreProps => ({
		selectedPassKind: state.selectedPass.selectedKind
	}),
	{ selectPassKind, selectPassAlternative }
)(PassSelector);

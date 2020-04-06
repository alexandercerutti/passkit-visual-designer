import * as React from "react";
import { connect } from "react-redux";
import "./style.less";
import App from "../App";
import { PassKind } from "../model";
import PassList from "./PassList";
import { setPassKind, setPassProps } from "../store/actions";
import { State } from "../store/state";
import NamedPass from "./NamedPass";
import { PassProps, PassCoreProps } from "../passes/PassCore";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface DispatchProps {
	setPassKind: typeof setPassKind,
	setPassProps: typeof setPassProps,
}

interface StoreProps {
	selectedPassKind: PassKind;
	passProps: PassProps;
}

interface SelectorProps extends DispatchProps, StoreProps, RouteComponentProps<any> {
	onPassKindSelection: App["onPassKindSelection"];
}

export interface PassAlternative {
	name: string;
	specificProps: Partial<PassProps>;
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

	onPassSelect(passProps: PassCoreProps) {
		console.log("Performed selection of", passProps.kind);

		this.props.setPassKind(passProps.kind);

		// @TODO: Select pass and call function
		// from parent to pass to the next area

		console.log("Performing next action...");
	}

	onAlternativeSelection(passProps: PassCoreProps) {
		const propsWithoutKind: PassProps = (({ kind, ...props }) => ({ ...props }))(passProps);
		this.props.setPassProps(propsWithoutKind);

		this.props.history.push("/creator");
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
			alternativesList &&
			<PassList requiresAttention onPassSelect={this.onAlternativeSelection}>
				{alternativesList}
			</PassList>
		) || null;

		return (
			<div id="selector-app">
				<header>
					<h2>{this.config.introText}</h2>
				</header>
				<div className="selection-window">
					<PassList onPassSelect={this.onPassSelect} selectedKind={selectedPassKind}>
						{passes}
					</PassList>
					{AlternativesListComponent}
				</div>
			</div>
		);
	}
}

export default withRouter(connect(
	(state: State): StoreProps => ({
		selectedPassKind: state.selectedPass.kind,
		passProps: state.selectedPass.props,
	}),
	{ setPassKind, setPassProps }
)(PassSelector));

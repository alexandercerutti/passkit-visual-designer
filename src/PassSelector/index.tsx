import * as React from "react";
import { connect } from "react-redux";
import "./style.less";
import { PassKind } from "../model";
import PassList from "./PassList";
import NamedPass from "./NamedPass";
import { PassProps } from "../Pass";
import type { PassAlternative } from "../Pass/useAlternativesRegistration";
import type { State } from "../store";
import * as Store from "../store";

// Webpack declared
declare const __DEV__: boolean;

interface DispatchProps {
	setPassProps: typeof Store.Pass.setPropsBatch,
}

interface StoreProps {
	selectedPassKind: PassKind;
}

interface SelectorState {
	selectedKind: PassKind;
}

interface SelectorProps extends DispatchProps, StoreProps {
	pushHistory(path: string, init?: Function): void;
}

type PassKindsAlternatives = { [key in PassKind]?: PassAlternative[] };

class PassSelector extends React.PureComponent<SelectorProps, SelectorState> {
	private alternatives: PassKindsAlternatives = {};

	private config = {
		introText: "Select your pass model"
	};

	constructor(props: SelectorProps) {
		super(props);

		this.state = {
			selectedKind: undefined
		};

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

		if (__DEV__) {
			console.log("Registering alternatives for", kind, alternatives);
		}
	}

	onPassSelect(passProps: PassProps) {
		if (__DEV__) {
			console.log("Performed selection of", passProps.kind);
		}

		if (this.state.selectedKind === passProps.kind) {
			this.setState({
				selectedKind: undefined,
			});
			return;
		}

		this.setState({
			selectedKind: passProps.kind,
		});
	}

	onAlternativeSelection(passProps: PassProps) {
		this.props.pushHistory("/creator", () => this.props.setPassProps(passProps));
	}

	render() {
		const { selectedKind } = this.state;
		const availableAlternatives = selectedKind && this.alternatives[selectedKind] || [];

		const passes = Object.entries(PassKind).map(([_, pass]) => {
			return (
				<NamedPass
					key={pass}
					name={pass}
					kind={pass}
					registerAlternatives={this.registerAlternatives.bind(this, pass)}
				/>
			);
		});

		const alternativesList = availableAlternatives.map((alternative) => {
			return (
				<NamedPass
					key={alternative.name}
					name={alternative.name}
					kind={selectedKind}
					{...alternative.specificProps}
				/>
			);
		});

		const AlternativesListComponent = (
			alternativesList.length &&
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
					<PassList onPassSelect={this.onPassSelect} selectedKind={selectedKind}>
						{passes}
					</PassList>
					{AlternativesListComponent}
				</div>
			</div>
		);
	}
}

export default connect(
	({ pass: { kind: selectedPassKind } }: State) => {
		return { selectedPassKind };
	},
	{
		setPassProps: Store.Pass.setPropsBatch
	}
)(PassSelector);

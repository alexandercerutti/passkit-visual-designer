import * as React from "react";
import { connect } from "react-redux";
import "./style.less";
import { PassKind } from "../model";
import PassList from "./PassList";
import { setPassKind, setPassProps } from "../store/actions";
import { State } from "../store/state";
import NamedPass from "./NamedPass";
import { PassProps } from "../Pass";
import { withRouter, RouteComponentProps } from "react-router-dom";
import type { PassAlternative } from "../Pass/useAlternativesRegistration";

interface DispatchProps {
	setPassKind: typeof setPassKind,
	setPassProps: typeof setPassProps,
}

interface StoreProps {
	selectedPassKind: PassKind;
}

interface SelectorProps extends DispatchProps, StoreProps, RouteComponentProps<any> { }

type PassKindsAlternatives = { [key in PassKind]?: PassAlternative[] };

class PassSelector extends React.PureComponent<SelectorProps> {
	private alternatives: PassKindsAlternatives = {};

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

	onPassSelect(passProps: PassProps) {
		console.log("Performed selection of", passProps.kind);

		if (this.props.selectedPassKind === passProps.kind) {
			this.props.setPassKind(undefined);
			return;
		}

		this.props.setPassKind(passProps.kind);
	}

	onAlternativeSelection(passProps: PassProps) {
		const { kind, ...props } = passProps;
		this.props.setPassProps(props);

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

		const alternativesList = availableAlternatives.map((alternative) => {
			return (
				<NamedPass
					key={alternative.name}
					name={alternative.name}
					kind={selectedPassKind}
					{...alternative.specificProps}
				/>
			);
		}) || null;

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
	({ pass }: State) => ({ selectedPassKind: pass.kind }),
	{ setPassKind, setPassProps }
)(PassSelector));

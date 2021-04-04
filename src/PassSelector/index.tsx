import * as React from "react";
import { connect } from "react-redux";
import "./style.less";
import { PassKind } from "../model";
import PassList from "./PassList";
import SelectablePass from "./SelectablePass";
import { PassProps } from "../Pass";
import { getAlternativesByKind } from "./SelectablePass/useAlternativesRegistration";
import * as Store from "../store";

// Webpack declared
declare const __DEV__: boolean;

interface DispatchProps {
	setPassProps: typeof Store.Pass.setPropsBatch;
}

interface SelectorState {
	selectedKind: PassKind;
}

interface SelectorProps extends DispatchProps {
	pushHistory(path: string, init?: Function): void;
}

class PassSelector extends React.PureComponent<SelectorProps, SelectorState> {
	private config = {
		introText: "Select your pass model",
	};

	constructor(props: SelectorProps) {
		super(props);

		this.state = {
			selectedKind: undefined,
		};

		this.onPassSelect = this.onPassSelect.bind(this);
		this.onAlternativeSelection = this.onAlternativeSelection.bind(this);
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

	/**
	 * Receives the pass props that identifies an alternative
	 * along with the kind and performs page changing
	 *
	 * @param passProps
	 */

	onAlternativeSelection(passProps: PassProps) {
		this.props.pushHistory("/creator", () => this.props.setPassProps(passProps));
	}

	render() {
		const { selectedKind } = this.state;
		const availableAlternatives = getAlternativesByKind(selectedKind) || [];

		const passes = Object.entries(PassKind).map(([_, pass]) => {
			return <SelectablePass key={pass} name={pass} kind={pass} />;
		});

		const alternativesList = availableAlternatives.map((alternative) => {
			return (
				<SelectablePass
					key={alternative.name}
					name={alternative.name}
					kind={selectedKind}
					{...alternative.specificProps}
				/>
			);
		});

		const AlternativesListComponent =
			(alternativesList.length && (
				<PassList requiresAttention onPassSelect={this.onAlternativeSelection}>
					{alternativesList}
				</PassList>
			)) ||
			null;

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

export default connect(null, {
	setPassProps: Store.Pass.setPropsBatch,
})(PassSelector);

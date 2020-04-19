import * as React from "react";
import "./style.less";
import Viewer from "./Viewer";
import OptionsBar from "./OptionsBar";
import OptionsMenu from "./OptionsMenu";
import { FieldKind, PassKind } from "../model";
import { InteractionContext } from "../passes/PassCore/interactionContext";
import { connect } from "react-redux";
import { PassProps } from "../passes/PassCore";
import { State } from "../store/state";
import DefaultFields from "./staticFields";
import { DataGroup } from "./OptionsMenu/PanelGroup";

interface ConfiguratorStore {
	kind: PassKind;
	passProps: PassProps;
}

interface ConfiguratorProps extends ConfiguratorStore { }
interface ConfiguratorState {
	selectedFieldId?: string;
	registeredFields: Map<string, FieldDetails>;
}

export interface FieldDetails {
	area: DataGroup;
	kind: FieldKind;
	mockable?: boolean;
	tooltipText?: string;
	disabled?: boolean;
	required?: boolean;
	jsonKeys?: string[];
}

class Configurator extends React.Component<ConfiguratorProps, ConfiguratorState> implements InteractionContext {
	constructor(props: ConfiguratorProps) {
		super(props);

		this.registerField = this.registerField.bind(this);
		this.onFieldSelect = this.onFieldSelect.bind(this);
		this.onVoidClick = this.onVoidClick.bind(this);
		this.onValueChange = this.onValueChange.bind(this);

		this.state = {
			selectedFieldId: null,
			registeredFields: new Map(DefaultFields),
		};
	}

	/**
	 * This function role is to register the fields that
	 * will be shown in the OptionsMenu
	 *
	 * @param kind
	 * @param id
	 */

	registerField(kind: FieldKind, id: string): boolean {
		console.log("Received registration request for", kind, "+", id);

		if (this.state.registeredFields.has(id)) {
			console.log("...but failed due to duplicate already available");
			return false;
		}

		this.setState(previous => {
			const updatedFields = new Map(previous.registeredFields);
			return {
				registeredFields: updatedFields.set(id, { kind, area: DataGroup.DATA })
			};
		});

		return true;
	}

	/**
	 * This function role is to notify the OptionsMenu
	 * to highlight the linked field
	 */

	onFieldSelect(id: string): void {
		this.setState({ selectedFieldId: id });
		console.log(id, "selected");
	}

	/**
	 * Updates the storage after a value from
	 * configurator has been changed and confirmed.
	 *
	 * @param key
	 * @param value
	 */

	onValueChange(key: string, value: any): boolean {
		// @TODO: validate the input
		// @TODO: save to store
		// @TODO: save to localForage

		// @TODO: return false if cannot validate the input
		return true;
	}

	/**
	 * Allows clicking on the void area
	 * to deselect around the pass to remove
	 * field selection
	 *
	 * @param e
	 */

	onVoidClick(e: React.MouseEvent) {
		if (e.target !== e.currentTarget) {
			return;
		}

		this.setState({ selectedFieldId: null });
	}

	render() {
		return (
			<div id="configurator">
				<div className="screen">
					<Viewer
						{...this.props}
						onFieldSelect={this.onFieldSelect}
						registerField={this.registerField}
						onVoidClick={this.onVoidClick}
					/>
					<OptionsBar />
				</div>
				<div className="config-panel">
					<OptionsMenu
						selection={this.state.selectedFieldId}
						registeredFields={this.state.registeredFields}
						onValueChange={this.onValueChange}
					/>
				</div>
			</div>
		);
	}
}

export default connect(
	(state: State): ConfiguratorStore => ({
		kind: state.selectedPass.kind,
		passProps: state.passContent
	}),
)(Configurator);

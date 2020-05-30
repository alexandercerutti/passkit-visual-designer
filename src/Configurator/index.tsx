import * as React from "react";
import "./style.less";
import Viewer from "./Viewer";
import OptionsBar from "./OptionsBar";
import OptionsMenu, { RegisteredFieldsMap } from "./OptionsMenu";
import { FieldKind, PassKind } from "../model";
import { InteractionContext } from "../passes/PassCore/interactionContext";
import { connect } from "react-redux";
import { PassProps } from "../passes/PassCore";
import { State } from "../store/state";
import DefaultFields from "./staticFields";
import { DataGroup } from "./OptionsMenu/PanelGroup";
import { FieldSelectHandler } from "../passes/Areas/useRegistrations";

interface ConfiguratorStore {
	kind: PassKind;
	passProps: PassProps;
}

interface ConfiguratorProps extends ConfiguratorStore { }
interface ConfiguratorState {
	selectedFieldId?: string;
	registeredFields: RegisteredFieldsMap;
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

	registerField(kind: FieldKind, name: string): FieldSelectHandler {
		console.log("Received registration request for", kind, "+", name);

		if (this.state.registeredFields.get(DataGroup.DATA).find(data => data.name === name)) {
			console.log("...but failed due to duplicate already available");
			return null;
		}

		this.setState(previous => {
			const updatedFields = new Map(previous.registeredFields);
			const fieldDataGroup = convertFieldKindToDataGroup(kind);

			if (!fieldDataGroup) {
				return {
					registeredFields: updatedFields
				};
			}

			return {
				registeredFields: updatedFields.set(fieldDataGroup, [...updatedFields.get(fieldDataGroup), { name, kind }])
			};
		});

		return () => this.onFieldSelect(name);
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

function convertFieldKindToDataGroup(kind: FieldKind): DataGroup {
	if (kind === FieldKind.IMAGE) {
		return DataGroup.IMAGES;
	}

	if (kind === FieldKind.COLOR) {
		return DataGroup.COLORS;
	}

	if (kind === FieldKind.FIELDS || kind === FieldKind.TEXT) {
		return DataGroup.DATA;
	}

	return undefined
}

export default connect(
	(state: State): ConfiguratorStore => ({
		kind: state.selectedPass.kind,
		passProps: state.passContent
	}),
)(Configurator);

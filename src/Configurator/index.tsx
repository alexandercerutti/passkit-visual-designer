import * as React from "react";
import "./style.less";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { changePassPropValue } from "../store/actions";
import Viewer from "./Viewer";
import OptionsBar from "./OptionsBar";
import OptionsMenu, { RegisteredFieldsMap } from "./OptionsMenu";
import { FieldKind, PassKind } from "../model";
import { InteractionContextMethods } from "../Pass/InteractionContext";
import { connect } from "react-redux";
import { PassMixedProps, MediaProps } from "../Pass";
import { State } from "../store/state";
import DefaultFields from "./staticFields";
import { DataGroup } from "./OptionsMenu/pages/PanelsPage/PanelGroup";
import { FieldSelectHandler } from "../Pass/layouts/sections/useRegistrations";
import ExportModal from "./ExportModal";
import { PKTransitType } from "../Pass/constants";

interface DispatchProps {
	changePassPropValue: typeof changePassPropValue;
}

interface ConfiguratorStore {
	passProps: PassMixedProps;
	mediaBuffers: Partial<Record<keyof MediaProps, ArrayBuffer>>;
}

interface ConfiguratorProps extends ConfiguratorStore, DispatchProps, RouteComponentProps<any> { }
interface ConfiguratorState {
	selectedFieldId?: string;
	registeredFields: RegisteredFieldsMap;
	shouldShowPassBack: boolean;
	emptyFieldsVisible: boolean;
	showExportModal: boolean;
}

class Configurator extends React.Component<ConfiguratorProps, ConfiguratorState> implements InteractionContextMethods {
	constructor(props: ConfiguratorProps) {
		super(props);

		this.registerField = this.registerField.bind(this);
		this.onFieldSelect = this.onFieldSelect.bind(this);
		this.onVoidClick = this.onVoidClick.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
		this.rotatePass = this.rotatePass.bind(this);
		this.toggleEmptyVisibility = this.toggleEmptyVisibility.bind(this);
		this.toggleExportModal = this.toggleExportModal.bind(this);

		this.state = {
			selectedFieldId: null,
			registeredFields: new Map(DefaultFields),
			shouldShowPassBack: false,
			emptyFieldsVisible: true,
			showExportModal: false,
		};
	}

	/**
	 * This function role is to register the fields that
	 * will be shown in the OptionsMenu
	 *
	 * @param kind
	 * @param id
	 */

	registerField(kind: FieldKind, groupName: string): FieldSelectHandler {
		console.log("Received registration request for", kind, "+", groupName);

		if (this.state.registeredFields.get(DataGroup.DATA).find(data => data.name === groupName)) {
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
				registeredFields: updatedFields.set(fieldDataGroup, [...updatedFields.get(fieldDataGroup), { name: groupName, kind }])
			};
		});

		return (key: string) => this.onFieldSelect(groupName, key);
	}

	/**
	 * This function role is to notify the OptionsMenu
	 * to highlight the linked field
	 */

	onFieldSelect(id: string, key: string | null): void {
		// @TODO: Resolve key in id
		this.setState({ selectedFieldId: id });
		console.log(id, "selected, with key", key);
	}

	/**
	 * Updates the storage after a value from
	 * configurator has been changed and confirmed.
	 *
	 * @param key
	 * @param value
	 */

	async onValueChange<T extends Object | string>(key: keyof PassMixedProps, value: T): Promise<boolean> {
		console.log("Panel with name", key, "tried to save", value);

		let valueToStore: any = value;

		if (value instanceof Blob) {
			valueToStore = await value.arrayBuffer();
		}

		this.props.changePassPropValue(key, valueToStore);

		// @TODO: validate the input?
		// @TODO: save to localForage - through a middleware? Dunno yet

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

	onVoidClick(e?: React.MouseEvent): void {
		if (e && e.target !== e.currentTarget) {
			return;
		}

		this.setState({ selectedFieldId: null });
	}

	rotatePass() {
		this.setState((previous) => ({
			shouldShowPassBack: !previous.shouldShowPassBack
		}));
	}

	toggleEmptyVisibility() {
		this.setState((previous) => ({
			emptyFieldsVisible: !previous.emptyFieldsVisible
		}));
	}

	toggleExportModal() {
		this.setState((previous) => ({
			showExportModal: !previous.showExportModal
		}));
	}

	render() {
		return (
			<div id="configurator">
				<div className="screen">
					<Viewer
						{...this.props.passProps}
						onFieldSelect={this.onFieldSelect}
						registerField={this.registerField}
						onVoidClick={this.onVoidClick}
						showBack={this.state.shouldShowPassBack}
						showEmpty={this.state.emptyFieldsVisible}
					/>
					<OptionsBar
						rotatePass={this.rotatePass}
						isEmptyVisible={this.state.emptyFieldsVisible}
						toggleEmptyVisibility={this.toggleEmptyVisibility}
					/>
				</div>
				<div className="config-panel">
					<OptionsMenu
						data={this.props.passProps}
						selection={this.state.selectedFieldId}
						registeredFields={this.state.registeredFields}
						onValueChange={this.onValueChange}
						cancelFieldSelection={this.onVoidClick}
						showExportModal={this.toggleExportModal}
					/>
				</div>
				{this.state.showExportModal &&
					<ExportModal
						partners={[{
							name: "Passkit-generator",
							lang: "javascript",
							template: `var x = {\n\tdescription: <!PKVD:inline description !>,\n\tserialNumber: <!PKVD:inline serialNumber !>\n}`
						}]}
						dataBank={this.props.passProps}
						closeModal={this.toggleExportModal}
					/>
				}
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

// Webpack defined
declare const isDevelopment: boolean;

export default withRouter(connect(
	(state: State): ConfiguratorStore => {
		const { pass, media, rawMedia: mediaBuffers } = state;

		const fallbackDevelopmentPassMetadata = !pass.kind && isDevelopment && {
			transitType: PKTransitType.Boat,
			kind: PassKind.BOARDING_PASS
		} || {};

		return {
			passProps: Object.assign(fallbackDevelopmentPassMetadata, pass, media),
			mediaBuffers
		};
	},
	{ changePassPropValue }
)(Configurator));

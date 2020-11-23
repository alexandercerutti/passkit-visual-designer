import * as React from "react";
import "./style.less";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { changePassPropValue, setProjectOption, ProjectOptions, setMediaActiveCollection, editCollection, setMediaExportState } from "../store/actions";
import Viewer from "./Viewer";
import OptionsBar from "./OptionsBar";
import OptionsMenu, { RegisteredFieldsMap } from "./OptionsMenu";
import { FieldKind, PassKind } from "../model";
import { InteractionContextMethods } from "../Pass/InteractionContext";
import { connect } from "react-redux";
import { MediaProps, PassMixedProps } from "../Pass";
import { CollectionSet, LocalizedMediaGroup, MediaCollection, MediaSet, State } from "../store/state";
import DefaultFields from "./staticFields";
import { DataGroup } from "./OptionsMenu/pages/PanelsPage/PanelGroup";
import { FieldSelectHandler } from "../Pass/layouts/sections/useRegistrations";
import ExportModal from "./ExportModal";
import { PKTransitType } from "../Pass/constants";
import { exportPass } from "./exportPass";
import MediaModal from "./MediaModal";
import { getArrayBuffer } from "../utils";

interface DispatchProps {
	changePassPropValue: typeof changePassPropValue;
	setProjectOption: typeof setProjectOption;
	setMediaActiveCollection: typeof setMediaActiveCollection;
	editCollection: typeof editCollection;
	setMediaExportState: typeof setMediaExportState;
}

interface ConfiguratorStore {
	passProps: PassMixedProps;
	media: LocalizedMediaGroup;
	projectOptions: ProjectOptions;
}

interface ConfiguratorProps extends ConfiguratorStore, DispatchProps, RouteComponentProps<any> { }
interface ConfiguratorState {
	selectedFieldId?: keyof PassMixedProps;
	registeredFields: RegisteredFieldsMap;
	shouldShowPassBack: boolean;
	emptyFieldsVisible: boolean;
	showExportModal: boolean;
	canBeExported: boolean;
	showMediaModalForMedia: keyof MediaProps;
}

class Configurator extends React.Component<ConfiguratorProps, ConfiguratorState> implements InteractionContextMethods {
	constructor(props: ConfiguratorProps) {
		super(props);

		this.registerField = this.registerField.bind(this);
		this.onFieldSelect = this.onFieldSelect.bind(this);
		this.onVoidClick = this.onVoidClick.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
		this.onShowPassBackRequest = this.onShowPassBackRequest.bind(this);
		this.toggleEmptyVisibility = this.toggleEmptyVisibility.bind(this);
		this.toggleExportModal = this.toggleExportModal.bind(this);
		this.requestExport = this.requestExport.bind(this);
		this.changeProjectTitle = this.changeProjectTitle.bind(this);
		this.toggleMediaModal = this.toggleMediaModal.bind(this);
		this.onMediaCollectionEdit = this.onMediaCollectionEdit.bind(this);
		this.onMediaCollectionUse = this.onMediaCollectionUse.bind(this);
		this.onMediaExportStateChange = this.onMediaExportStateChange.bind(this);

		this.state = {
			selectedFieldId: null,
			registeredFields: new Map(DefaultFields),
			shouldShowPassBack: false,
			emptyFieldsVisible: true,
			showExportModal: false,
			canBeExported: false,
			showMediaModalForMedia: null,
		};
	}

	static getDerivedStateFromProps(props: ConfiguratorProps) {
		const { description, organizationName, passTypeIdentifier, teamIdentifier } = props?.passProps ?? {};

		if (!(description && organizationName && passTypeIdentifier && teamIdentifier)) {
			return {
				canBeExported: false
			};
		}

		return {
			canBeExported: true
		};
	}

	/**
	 * This function role is to register the fields that
	 * will be shown in the OptionsMenu
	 *
	 * @param kind
	 * @param id
	 */

	registerField(kind: FieldKind, id: keyof PassMixedProps): FieldSelectHandler {
		if (this.state.registeredFields.get(DataGroup.DATA).find(data => data.name === id)) {
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
				registeredFields: updatedFields.set(
					fieldDataGroup,
					[
						...updatedFields.get(fieldDataGroup),
						{ name: id, kind }
					]
				)
			};
		});

		return (key: string) => this.onFieldSelect(id, key);
	}

	/**
	 * This function role is to notify the OptionsMenu
	 * to highlight the linked field
	 */

	onFieldSelect(id: keyof PassMixedProps, key: string | null): void {
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
			valueToStore = await getArrayBuffer(value);
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

	onShowPassBackRequest() {
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

	toggleMediaModal(mediaName: keyof MediaProps) {
		this.setState((previous) => ({
			showMediaModalForMedia: previous.showMediaModalForMedia ? null : mediaName
		}));
	}

	changeProjectTitle(title: string) {
		this.props.setProjectOption("title", title);
	}

	onMediaCollectionEdit(collectionID: string, collection: MediaCollection) {
		const { showMediaModalForMedia: mediaName } = this.state;

		this.props.editCollection(mediaName, collectionID, collection);
	}

	onMediaCollectionUse(collectionID: string) {
		this.props.setMediaActiveCollection(
			this.state.showMediaModalForMedia,
			this.props.projectOptions.activeMediaLanguage,
			collectionID
		);
	}

	onMediaExportStateChange(enable: boolean) {
		this.props.setMediaExportState(
			this.state.showMediaModalForMedia,
			this.props.projectOptions.activeMediaLanguage,
			enable
		);
	}

	async requestExport() {
		// @TODO: check requirements for exporting
		// so all the basic fields and so on.

		this.toggleExportModal();

		const buffer = await exportPass(this.props.passProps, this.props.media);
		const fileURL = URL.createObjectURL(buffer);

		Object.assign(document.createElement("a"), {
			download: `${this.props.projectOptions.title ?? "untitled project"}.zip`,
			href: fileURL
		}).click();

		// @TODO discuss if a setTimeout is needed here
		// to delay url destroy.
		URL.revokeObjectURL(fileURL);
	}

	render() {
		const allPassProps = Object.assign({},
			this.props.passProps,
			getBestResolutionForMedia(this.props.media[this.props.projectOptions.activeMediaLanguage]),
		);

		return (
			<div id="configurator">
				<div className="screen">
					<Viewer
						{...allPassProps}
						onFieldSelect={this.onFieldSelect}
						registerField={this.registerField}
						onVoidClick={this.onVoidClick}
						showBack={this.state.shouldShowPassBack}
						showEmpty={this.state.emptyFieldsVisible}
						projectTitle={this.props.projectOptions?.title}
						changeProjectTitle={this.changeProjectTitle}
					/>
					<OptionsBar
						rotatePass={this.onShowPassBackRequest}
						isEmptyVisible={this.state.emptyFieldsVisible}
						toggleEmptyVisibility={this.toggleEmptyVisibility}
					/>
				</div>
				<div className="config-panel">
					<OptionsMenu
						data={allPassProps}
						selection={this.state.selectedFieldId}
						registeredFields={this.state.registeredFields}
						onValueChange={this.onValueChange}
						cancelFieldSelection={this.onVoidClick}
						requestExport={this.state.canBeExported && this.requestExport || null}
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
				{this.state.showMediaModalForMedia &&
					<MediaModal
						closeModal={() => this.toggleMediaModal(this.state.showMediaModalForMedia)}
						passProps={allPassProps}
						mediaName={this.state.showMediaModalForMedia}
						mediaContent={this.props.media?.[this.props.projectOptions.activeMediaLanguage]?.[this.state.showMediaModalForMedia] ?? {} as CollectionSet}
						updateCollection={this.onMediaCollectionEdit}
						useCollection={this.onMediaCollectionUse}
						setMediaExportState={this.onMediaExportStateChange}
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

/**
 * It retrieves the URL to use for each media.
 * It should select the best resolution to use, but currently
 * we don't have a well-defined criteria to use.
 *
 * @param mediaSetForSelectedLanguage
 * @TODO Use a selection criteria to select the best resolution
 */

function getBestResolutionForMedia(mediaSetForSelectedLanguage: MediaSet) {
	const best = {} as MediaProps;

	for (let m in mediaSetForSelectedLanguage) {
		const key = m as keyof MediaSet;
		const media = mediaSetForSelectedLanguage[key] as CollectionSet;
		const { activeCollectionID = "", collections } = media ?? {};

		if (media && activeCollectionID) {
			const resolutions = Object.values(collections[activeCollectionID].resolutions);
			best[key] = resolutions[0]?.content[1];
		}
	}

	return best;
}

// Webpack defined
declare const isDevelopment: boolean;

export default withRouter(connect(
	(state: State): ConfiguratorStore => {
		const { pass, media, projectOptions } = state;

		const fallbackDevelopmentPassMetadata = !pass.kind && isDevelopment && {
			transitType: PKTransitType.Boat,
			kind: PassKind.BOARDING_PASS
		} || {};

		return {
			passProps: Object.assign(fallbackDevelopmentPassMetadata, pass),
			media,
			projectOptions
		};
	},
	{
		changePassPropValue,
		setProjectOption,
		setMediaActiveCollection,
		editCollection,
		setMediaExportState
	}
)(Configurator));

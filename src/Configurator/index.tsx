import * as React from "react";
import "./style.less";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Viewer from "./Viewer";
import OptionsBar from "./OptionsBar";
import OptionsMenu, { RegisteredFieldsMap } from "./OptionsMenu";
import { FieldKind } from "../model";
import { InteractionContextMethods } from "../Pass/InteractionContext";
import { connect } from "react-redux";
import { MediaProps, PassMixedProps } from "../Pass";
import type { CollectionSet, LocalizedMediaGroup, MediaCollection, MediaSet, State } from "../store";
import * as Store from "../store";
import DefaultFields from "./staticFields";
import { DataGroup } from "./OptionsMenu/pages/PanelsPage";
import { FieldSelectHandler } from "../Pass/layouts/sections/useRegistrations";
import ExportModal from "./ExportModal";
import { exportPass } from "./exportPass";
import MediaModal from "./MediaModal";
import { getArrayBuffer } from "../utils";
import LanguageModal from "./LanguageModal";
import TranslationsModal from "./TranslationsModal";
import { v1 as uuid } from "uuid";
import 'prismjs/components/prism-json';
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";

/**
 * Filters out from B the keys that not match the type of T.
 * @see https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c
 */

type FilterOutUnmatchedType<B extends Object, T extends any> = {
	[K in keyof B]: B[K] extends T ? K : never;
}[keyof B]

interface DispatchProps {
	changePassPropValue: typeof Store.Pass.setProp;
	setProjectOption: typeof Store.Options.Set;
	setMediaActiveCollection: typeof Store.Media.SetActiveCollection;
	editCollection: typeof Store.Media.EditCollection;
	setMediaExportState: typeof Store.Media.SetExportState;
	setTranslationExportState: typeof Store.Translations.SetExportState;
	initTranslation: typeof Store.Translations.Init;
	addTranslation: typeof Store.Translations.Add;
	removeTranslation: typeof Store.Translations.Remove;
	editTranslation: typeof Store.Translations.Edit;
	createMedia: typeof Store.Media.Create;
}

interface ConfiguratorStore {
	passProps: State["pass"];
	media: State["media"];
	usedLanguages: Set<string>;
	projectOptions: State["projectOptions"];
	translations: State["translations"];
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
	showLanguageModal: boolean;
	showTranslationsModal: boolean;
}

/**
 * 200 milliseconds seems to be enough to allow
 * react-transition-group to perform animation and
 * unmounting without letting us closing the modals
 * without mistakenly toggling them again while clicking
 * on the cross icon, that becomes invisible until
 * the modal is unmounted
 */

const MODAL_TIMEOUT = 200;

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
		this.toggleLanguageModal = this.toggleLanguageModal.bind(this);
		this.toggleTranslationsModal = this.toggleTranslationsModal.bind(this);
		this.onActiveMediaLanguageChange = this.onActiveMediaLanguageChange.bind(this);
		this.onTranslationEdit = this.onTranslationEdit.bind(this);
		this.onTranslationAdd = this.onTranslationAdd.bind(this);
		this.onTranslationRemove = this.onTranslationRemove.bind(this);
		this.onTranslationExportStateChange = this.onTranslationExportStateChange.bind(this);

		this.state = {
			selectedFieldId: null,
			registeredFields: new Map(DefaultFields),
			shouldShowPassBack: false,
			emptyFieldsVisible: true,
			showExportModal: false,
			canBeExported: false,
			showMediaModalForMedia: null,
			showLanguageModal: false,
			showTranslationsModal: false,
		};
	}

	componentDidMount() {
		/**
		 * Initializing project identifier
		 * tecnically App component should provide it but
		 */
		if (!this.props.projectOptions.id) {
			this.props.setProjectOption("id", uuid());
		}
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

	private StateToggler(property: FilterOutUnmatchedType<ConfiguratorState, boolean>) {
		this.setState((previous) => ({
			[property]: !previous[property]
		} as Record<typeof property, boolean>));
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
		this.StateToggler("shouldShowPassBack");
	}

	toggleEmptyVisibility() {
		this.StateToggler("emptyFieldsVisible");
	}

	toggleExportModal() {
		this.StateToggler("showExportModal");
	}

	toggleTranslationsModal() {
		this.StateToggler("showTranslationsModal");
	}

	toggleMediaModal(mediaName: keyof MediaProps) {
		this.setState((previous) => ({
			showMediaModalForMedia: previous.showMediaModalForMedia ? null : mediaName
		}));
	}

	toggleLanguageModal() {
		this.StateToggler("showLanguageModal");
	}

	changeProjectTitle(title: string) {
		this.props.setProjectOption("title", title);
	}

	onActiveMediaLanguageChange(language: string) {
		console.log("Selected new language:", language);
		this.props.setProjectOption("activeMediaLanguage", language);
		this.toggleLanguageModal();
	}

	onMediaCollectionEdit(collectionID: string, collection: MediaCollection) {
		const { showMediaModalForMedia: mediaName } = this.state;
		const { activeMediaLanguage } = this.props.projectOptions;

		this.props.editCollection(mediaName, activeMediaLanguage, collectionID, collection);
	}

	onMediaCollectionUse(collectionID: string) {
		this.props.setMediaActiveCollection(
			this.state.showMediaModalForMedia,
			this.props.projectOptions.activeMediaLanguage,
			collectionID
		);
	}

	onMediaExportStateChange(enabled: boolean) {
		this.props.setMediaExportState(
			this.state.showMediaModalForMedia,
			this.props.projectOptions.activeMediaLanguage,
			enabled
		);
	}

	onTranslationEdit(id: string, placeholder: string, value: string) {
		this.props.editTranslation(
			this.props.projectOptions.activeMediaLanguage,
			id,
			placeholder,
			value
		);
	}

	onTranslationAdd() {
		this.props.addTranslation(this.props.projectOptions.activeMediaLanguage, uuid());
	}

	onTranslationRemove(id: string) {
		this.props.removeTranslation(
			this.props.projectOptions.activeMediaLanguage,
			id
		);
	}

	onTranslationExportStateChange(enabled: boolean) {
		this.props.setTranslationExportState(
			this.props.projectOptions.activeMediaLanguage,
			enabled
		);
	}

	async requestExport() {
		// @TODO: check requirements for exporting
		// so all the basic fields and so on.

		this.toggleExportModal();

		const { projectOptions, passProps, media, translations } = this.props;

		const buffer = await exportPass(passProps, media, translations);
		const fileURL = URL.createObjectURL(buffer);

		Object.assign(document.createElement("a"), {
			download: `${projectOptions.title ?? "untitled project"}.zip`,
			href: fileURL
		}).click();

		// @TODO discuss if a setTimeout is needed here
		// to delay url destroy.
		URL.revokeObjectURL(fileURL);
	}

	render() {
		const {
			projectOptions: { title, activeMediaLanguage },
			usedLanguages,
			translations,
			passProps,
			media
		} = this.props;

		const {
			shouldShowPassBack,
			emptyFieldsVisible,
			registeredFields,
			selectedFieldId,
			canBeExported,
			showMediaModalForMedia,
			showExportModal,
			showLanguageModal,
			showTranslationsModal,
		} = this.state;

		return (
			<div id="configurator">
				<div className="screen">
					<Viewer
						passProps={passProps}
						translationSet={translations[activeMediaLanguage]}
						onFieldSelect={this.onFieldSelect}
						registerField={this.registerField}
						onVoidClick={this.onVoidClick}
						showBack={shouldShowPassBack}
						showEmpty={emptyFieldsVisible}
						projectTitle={title}
						changeProjectTitle={this.changeProjectTitle}
					/>
					<OptionsBar
						rotatePass={this.onShowPassBackRequest}
						isEmptyVisible={emptyFieldsVisible}
						toggleEmptyVisibility={this.toggleEmptyVisibility}
						toggleTranslationsModal={this.toggleTranslationsModal}
					/>
				</div>
				<div className="config-panel">
					<OptionsMenu
						data={passProps}
						selectedFieldID={selectedFieldId}
						fields={registeredFields}
						onValueChange={this.onValueChange}
						cancelFieldSelection={this.onVoidClick}
						requestExport={canBeExported && this.requestExport || null}
						onMediaEditRequest={this.toggleMediaModal}
					/>
				</div>
				<CSSTransition
					mountOnEnter
					unmountOnExit
					in={showExportModal}
					timeout={MODAL_TIMEOUT}
				>
					<ExportModal
						partners={[{
							name: "Passkit-generator",
							lang: "javascript",
							template: `var x = {\n\tdescription: <!PKVD:inline description !>,\n\tserialNumber: <!PKVD:inline serialNumber !>\n}`
						}]}
						dataBank={passProps}
						closeModal={this.toggleExportModal}
					/>
				</CSSTransition>
				<CSSTransition
					mountOnEnter
					unmountOnExit
					in={Boolean(showMediaModalForMedia)}
					timeout={MODAL_TIMEOUT}
				>
					<MediaModal
						passProps={passProps}
						currentLanguage={activeMediaLanguage}
						mediaName={showMediaModalForMedia}
						mediaContent={media?.[activeMediaLanguage]?.[showMediaModalForMedia]}
						requestForLanguageChange={this.toggleLanguageModal}
						updateCollection={this.onMediaCollectionEdit}
						useCollection={this.onMediaCollectionUse}
						setMediaExportState={this.onMediaExportStateChange}
						closeModal={() => this.toggleMediaModal(showMediaModalForMedia)}
					/>
				</CSSTransition>
				<CSSTransition
					mountOnEnter
					unmountOnExit
					in={showTranslationsModal}
					timeout={MODAL_TIMEOUT}
				>
					<TranslationsModal
						closeModal={this.toggleTranslationsModal}
						availableTranslations={translations?.[activeMediaLanguage]}
						currentLanguage={activeMediaLanguage}
						requestForLanguageChange={this.toggleLanguageModal}
						editTranslation={this.onTranslationEdit}
						addTranslation={this.onTranslationAdd}
						removeTranslation={this.onTranslationRemove}
						setExportState={this.onTranslationExportStateChange}
					/>
				</CSSTransition>
				<CSSTransition
					mountOnEnter
					unmountOnExit
					in={showLanguageModal}
					timeout={MODAL_TIMEOUT}
				>
					<LanguageModal
						closeModal={this.toggleLanguageModal}
						currentLanguage={activeMediaLanguage}
						usedLanguages={usedLanguages}
						selectLanguage={this.onActiveMediaLanguageChange}
					/>
				</CSSTransition>
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
 * The first criteria we apply is fallback-ing to default
 * when we don't have a media for the current language.
 *
 * Another criteria should be about selecting best resolution...
 * but are we ready yet?
 *
 * @param mediaSetForSelectedLanguage
 */

function getBestResolutionForMedia(mediaGroup: LocalizedMediaGroup, selectedLanguage: string) {
	const best = {} as MediaProps;

	/**
	 * If we don't have a media initialized for this language,
	 * we directly fallback to default.
	 */

	const firstGroupToCheck = mediaGroup[selectedLanguage] || mediaGroup["default"];

	if (!firstGroupToCheck) {
		return best;
	}

	for (let [mediaName, media] of Object.entries(firstGroupToCheck) as [keyof MediaProps, CollectionSet][]) {
		if (media) {
			const { activeCollectionID = "", collections, enabled } = media;

			let searchResolutionArea: Store.IdentifiedResolutions;

			if (activeCollectionID && enabled) {
				searchResolutionArea = collections[activeCollectionID].resolutions;
			} else if (firstGroupToCheck !== mediaGroup["default"]) {
				const group = mediaGroup["default"];
				const media = group?.[mediaName];
				const defaultActiveCollectionId = media?.activeCollectionID;

				searchResolutionArea = defaultActiveCollectionId && media?.collections?.[defaultActiveCollectionId]?.resolutions || {};
			} else {
				searchResolutionArea = {};
			}

			best[mediaName] = sessionStorage.getItem(Object.keys(searchResolutionArea)[0]);
		}
	}

	return best;
}

// Webpack defined
declare const isDevelopment: boolean;

export default withRouter(connect(
	(state: State): ConfiguratorStore => {
		const { pass, media, projectOptions, translations } = state;

		const usedLanguages = new Set([
			/**
			 * Seeking for medias or translations that have
			 * contents for current language
			 */
			...Object.entries(media)
				.filter(([_, mediaSet]) => hasMediaContents(mediaSet)),
			...Object.entries(translations)
				.filter(([_, translationSet]) => Object.keys(translationSet.translations).length)
		].map(([language]) => language));

		const passPropsWithSelectedMediaUrl = Object.assign({},
			pass,
			getBestResolutionForMedia(media, projectOptions.activeMediaLanguage)
		);

		return {
			passProps: passPropsWithSelectedMediaUrl,
			media,
			translations,
			usedLanguages,
			projectOptions
		};
	},
	{
		changePassPropValue: Store.Pass.setProp,
		setProjectOption: Store.Options.Set,
		createMedia: Store.Media.Create,
		setMediaActiveCollection: Store.Media.SetActiveCollection,
		editCollection: Store.Media.EditCollection,
		setMediaExportState: Store.Media.SetExportState,
		setTranslationExportState: Store.Translations.SetExportState,
		addTranslation: Store.Translations.Add,
		removeTranslation: Store.Translations.Remove,
		editTranslation: Store.Translations.Edit,
		initTranslation: Store.Translations.Init,
	}
)(Configurator));

function hasMediaContents(media: MediaSet) {
	return Object.values(media)
		.some((collectionSet) => Object.keys(collectionSet.collections).length)
}

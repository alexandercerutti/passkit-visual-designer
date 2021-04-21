import * as React from "react";
import "./style.less";
import { InteractionContext, PassMediaProps, PassMixedProps } from "@pkvd/pass";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { v1 as uuid } from "uuid";
import Viewer from "./Viewer";
import OptionsBar from "./OptionsBar";
import OptionsMenu from "./OptionsMenu";
import { FieldKind } from "../model";
import * as Store from "@pkvd/store";
import DefaultFields from "./staticFields";
import { DataGroup } from "./OptionsMenu/pages/PanelsPage";
import { FieldSelectHandler } from "../Pass/layouts/sections/useRegistrations";
import ExportModal from "./ExportModal";
import { exportPass } from "./exportPass";
import MediaModal from "./MediaModal";
import { getArrayBuffer } from "../utils";
import LanguageModal from "./LanguageModal";
import TranslationsModal from "./TranslationsModal";
import RegistrationIndex from "./RegistrationIndex";
import { FieldDetails } from "./OptionsMenu/pages/PanelsPage/Panel";
import "prismjs/components/prism-json";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";

// Webpack defined
declare const __DEV__: boolean;

const enum ModalIdentifier {
	None /******/ = 0b00000,
	Translations = 0b00001,
	Language /**/ = 0b00010,
	Media /******/ = 0b00100,
	Export /*****/ = 0b01000,
}

interface DispatchProps {
	changePassPropValue: typeof Store.Pass.setProp;
	setProjectOption: typeof Store.Options.Set;
	setMediaActiveCollection: typeof Store.Media.SetActiveCollection;
	editCollection: typeof Store.Media.EditCollection;
	setMediaExportState: typeof Store.Media.SetExportState;
	setTranslationExportState: typeof Store.Translations.SetExportState;
	addTranslation: typeof Store.Translations.Add;
	removeTranslation: typeof Store.Translations.Remove;
	editTranslation: typeof Store.Translations.Edit;
}

interface ConfiguratorStore {
	passProps: Store.State["pass"];
	media: Store.State["media"];
	usedLanguages: Set<string>;
	projectOptions: Store.State["projectOptions"];
	translations: Store.State["translations"];
}

interface ConfiguratorProps extends ConfiguratorStore, DispatchProps, RouteComponentProps<any> {}
interface ConfiguratorState {
	selectedRegistered?: FieldDetails;
	shouldShowPassBack: boolean;
	emptyFieldsVisible: boolean;
	canBeExported: boolean;
	viewingMediaName: keyof PassMediaProps;
	modalIdentifier: number;
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

class Configurator extends React.Component<ConfiguratorProps, ConfiguratorState> {
	private registeredFields = new RegistrationIndex(DefaultFields);

	constructor(props: ConfiguratorProps) {
		super(props);

		this.registerField = this.registerField.bind(this);
		this.onFieldSelect = this.onFieldSelect.bind(this);
		this.onVoidClick = this.onVoidClick.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
		this.onShowPassBackRequest = this.onShowPassBackRequest.bind(this);
		this.toggleEmptyVisibility = this.toggleEmptyVisibility.bind(this);
		this.requestExport = this.requestExport.bind(this);
		this.changeProjectTitle = this.changeProjectTitle.bind(this);
		this.toggleMediaModal = this.toggleMediaModal.bind(this);
		this.onMediaCollectionEdit = this.onMediaCollectionEdit.bind(this);
		this.onMediaCollectionUse = this.onMediaCollectionUse.bind(this);
		this.onMediaExportStateChange = this.onMediaExportStateChange.bind(this);
		this.onActiveMediaLanguageChange = this.onActiveMediaLanguageChange.bind(this);
		this.onTranslationEdit = this.onTranslationEdit.bind(this);
		this.onTranslationAdd = this.onTranslationAdd.bind(this);
		this.onTranslationRemove = this.onTranslationRemove.bind(this);
		this.onTranslationExportStateChange = this.onTranslationExportStateChange.bind(this);

		this.state = {
			selectedRegistered: null,
			shouldShowPassBack: false,
			emptyFieldsVisible: true,
			canBeExported: false,
			viewingMediaName: null,
			modalIdentifier: ModalIdentifier.None,
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
		const { description, organizationName, passTypeIdentifier, teamIdentifier } =
			props?.passProps ?? {};

		if (!(description && organizationName && passTypeIdentifier && teamIdentifier)) {
			return {
				canBeExported: false,
			};
		}

		return {
			canBeExported: true,
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
		const dataGroup = convertFieldKindToDataGroup(kind);

		if (this.registeredFields.findInDatagroup(dataGroup, id)) {
			if (__DEV__) {
				console.log("...but failed due to duplicate already available");
			}

			return null;
		}

		this.registeredFields.setByDatagroup(dataGroup, {
			name: id,
			kind,
			group: dataGroup,
		});

		return (key: string) => this.onFieldSelect(id, key);
	}

	/**
	 * This function role is to notify the OptionsMenu
	 * to highlight the linked field
	 */

	onFieldSelect(id: keyof PassMixedProps, key: string | null): void {
		const detail = this.registeredFields.getById(id);

		// @TODO: Resolve key in id
		this.setState({ selectedRegistered: detail });

		if (__DEV__) {
			console.log(id, "selected, with key", key);
		}
	}

	/**
	 * Updates the storage after a value from
	 * configurator has been changed and confirmed.
	 *
	 * @param key
	 * @param value
	 */

	async onValueChange<T extends Object | string>(
		key: keyof PassMixedProps,
		value: T
	): Promise<boolean> {
		if (__DEV__) {
			console.log("Panel with name", key, "tried to save", value);
		}

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

		this.setState({ selectedRegistered: null });
	}

	onShowPassBackRequest() {
		this.setState((previous) => ({
			shouldShowPassBack: !previous.shouldShowPassBack,
		}));
	}

	toggleEmptyVisibility() {
		this.setState((previous) => ({
			emptyFieldsVisible: !previous.emptyFieldsVisible,
		}));
	}

	toggleMediaModal(mediaName?: keyof PassMediaProps) {
		this.setState((previous) => ({
			modalIdentifier: previous.modalIdentifier ^ ModalIdentifier.Media,
			viewingMediaName: previous.viewingMediaName ? null : mediaName,
		}));
	}

	toggleModal(mask: ModalIdentifier) {
		this.setState((previous) => ({
			modalIdentifier: previous.modalIdentifier ^ mask,
		}));
	}

	changeProjectTitle(title: string) {
		this.props.setProjectOption("title", title);
	}

	onActiveMediaLanguageChange(language: string) {
		if (__DEV__) {
			console.log("Selected new language:", language);
		}

		this.props.setProjectOption("activeMediaLanguage", language);
		this.toggleModal(ModalIdentifier.Language);
	}

	onMediaCollectionEdit(collectionID: string, collection: Store.MediaCollection) {
		const { viewingMediaName: mediaName } = this.state;
		const { activeMediaLanguage } = this.props.projectOptions;

		this.props.editCollection(mediaName, activeMediaLanguage, collectionID, collection);
	}

	onMediaCollectionUse(collectionID: string) {
		this.props.setMediaActiveCollection(
			this.state.viewingMediaName,
			this.props.projectOptions.activeMediaLanguage,
			collectionID
		);
	}

	onMediaExportStateChange(enabled: boolean) {
		this.props.setMediaExportState(
			this.state.viewingMediaName,
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
		this.props.removeTranslation(this.props.projectOptions.activeMediaLanguage, id);
	}

	onTranslationExportStateChange(enabled: boolean) {
		this.props.setTranslationExportState(this.props.projectOptions.activeMediaLanguage, enabled);
	}

	async requestExport() {
		// @TODO: check requirements for exporting
		// so all the basic fields and so on.

		this.toggleModal(ModalIdentifier.Export);

		const { projectOptions, passProps, media, translations } = this.props;

		const buffer = await exportPass(passProps, media, translations);
		const fileURL = URL.createObjectURL(buffer);

		Object.assign(document.createElement("a"), {
			download: `${projectOptions.title ?? "untitled project"}.zip`,
			href: fileURL,
		}).click();

		// @TODO discuss if a setTimeout is needed here
		// to delay url destroy.
		URL.revokeObjectURL(fileURL);
	}

	render() {
		const { projectOptions, usedLanguages, translations, passProps, media } = this.props;

		const { title, activeMediaLanguage } = projectOptions;

		const {
			shouldShowPassBack,
			emptyFieldsVisible,
			selectedRegistered,
			canBeExported,
			viewingMediaName,
			modalIdentifier,
		} = this.state;

		return (
			<div id="configurator">
				<div className="screen">
					<InteractionContext.Provider value={this.registerField}>
						<Viewer
							passProps={passProps}
							translationSet={translations[activeMediaLanguage]}
							onVoidClick={this.onVoidClick}
							showBack={shouldShowPassBack}
							showEmpty={emptyFieldsVisible}
							projectTitle={title}
							changeProjectTitle={this.changeProjectTitle}
						/>
					</InteractionContext.Provider>
					<OptionsBar
						rotatePass={this.onShowPassBackRequest}
						isEmptyVisible={emptyFieldsVisible}
						toggleEmptyVisibility={this.toggleEmptyVisibility}
						toggleTranslationsModal={() => this.toggleModal(ModalIdentifier.Translations)}
					/>
				</div>
				<div className="config-panel">
					<OptionsMenu
						data={passProps}
						selectedRegistrable={selectedRegistered}
						fields={this.registeredFields}
						onValueChange={this.onValueChange}
						cancelFieldSelection={this.onVoidClick}
						requestExport={(canBeExported && this.requestExport) || null}
						onMediaEditRequest={this.toggleMediaModal}
					/>
				</div>
				<CSSTransition
					mountOnEnter
					unmountOnExit
					in={Boolean(modalIdentifier & ModalIdentifier.Export)}
					timeout={MODAL_TIMEOUT}
				>
					<ExportModal
						closeModal={() => this.toggleModal(ModalIdentifier.Export)}
						passProps={passProps}
						media={media}
						translations={translations}
						projectOptions={projectOptions}
					/>
				</CSSTransition>
				<CSSTransition
					mountOnEnter
					unmountOnExit
					in={Boolean(modalIdentifier & ModalIdentifier.Media)}
					timeout={MODAL_TIMEOUT}
				>
					<MediaModal
						passProps={passProps}
						currentLanguage={activeMediaLanguage}
						mediaName={viewingMediaName}
						mediaContent={media?.[activeMediaLanguage]?.[viewingMediaName]}
						requestForLanguageChange={() => this.toggleModal(ModalIdentifier.Language)}
						updateCollection={this.onMediaCollectionEdit}
						useCollection={this.onMediaCollectionUse}
						setMediaExportState={this.onMediaExportStateChange}
						closeModal={this.toggleMediaModal}
					/>
				</CSSTransition>
				<CSSTransition
					mountOnEnter
					unmountOnExit
					in={Boolean(modalIdentifier & ModalIdentifier.Translations)}
					timeout={MODAL_TIMEOUT}
				>
					<TranslationsModal
						closeModal={() => this.toggleModal(ModalIdentifier.Translations)}
						availableTranslations={translations?.[activeMediaLanguage]}
						currentLanguage={activeMediaLanguage}
						requestForLanguageChange={() => this.toggleModal(ModalIdentifier.Language)}
						editTranslation={this.onTranslationEdit}
						addTranslation={this.onTranslationAdd}
						removeTranslation={this.onTranslationRemove}
						setExportState={this.onTranslationExportStateChange}
					/>
				</CSSTransition>
				<CSSTransition
					mountOnEnter
					unmountOnExit
					in={Boolean(modalIdentifier & ModalIdentifier.Language)}
					timeout={MODAL_TIMEOUT}
				>
					<LanguageModal
						closeModal={() => this.toggleModal(ModalIdentifier.Language)}
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

	return undefined;
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

function getBestResolutionForMedia(
	mediaGroup: Store.LocalizedMediaGroup,
	selectedLanguage: string
) {
	const best = {} as PassMediaProps;

	/**
	 * If we don't have a media initialized for this language,
	 * we directly fallback to default.
	 */

	const firstGroupToCheck = mediaGroup[selectedLanguage] || mediaGroup["default"];

	if (!firstGroupToCheck) {
		return best;
	}

	for (let [mediaName, media] of Object.entries(firstGroupToCheck) as [
		keyof PassMediaProps,
		Store.CollectionSet
	][]) {
		if (media) {
			const { activeCollectionID = "", collections, enabled } = media;

			let searchResolutionArea: Store.IdentifiedResolutions;

			if (activeCollectionID && enabled) {
				searchResolutionArea = collections[activeCollectionID].resolutions;
			} else if (firstGroupToCheck !== mediaGroup["default"]) {
				const group = mediaGroup["default"];
				const media = group?.[mediaName];
				const defaultActiveCollectionId = media?.activeCollectionID;

				searchResolutionArea =
					(defaultActiveCollectionId &&
						media?.collections?.[defaultActiveCollectionId]?.resolutions) ||
					{};
			} else {
				searchResolutionArea = {};
			}

			best[mediaName] = sessionStorage.getItem(Object.keys(searchResolutionArea)[0]);
		}
	}

	return best;
}

export default withRouter(
	connect(
		(state: Store.State): ConfiguratorStore => {
			const { pass, media, projectOptions, translations } = state;

			const usedLanguages = new Set(
				[
					/**
					 * Seeking for medias or translations that have
					 * contents for current language
					 */
					...Object.entries(media).filter(([_, mediaSet]) => hasMediaContents(mediaSet)),
					...Object.entries(translations).filter(
						([_, translationSet]) => Object.keys(translationSet.translations).length
					),
				].map(([language]) => language)
			);

			const passPropsWithSelectedMediaUrl = Object.assign(
				{},
				pass,
				getBestResolutionForMedia(media, projectOptions.activeMediaLanguage)
			);

			return {
				passProps: passPropsWithSelectedMediaUrl,
				media,
				translations,
				usedLanguages,
				projectOptions,
			};
		},
		{
			changePassPropValue: Store.Pass.setProp,
			setProjectOption: Store.Options.Set,
			setMediaActiveCollection: Store.Media.SetActiveCollection,
			editCollection: Store.Media.EditCollection,
			setMediaExportState: Store.Media.SetExportState,
			setTranslationExportState: Store.Translations.SetExportState,
			addTranslation: Store.Translations.Add,
			removeTranslation: Store.Translations.Remove,
			editTranslation: Store.Translations.Edit,
		} as DispatchProps
	)(Configurator)
);

function hasMediaContents(media: Store.MediaSet) {
	return Object.values(media).some(
		(collectionSet) => Object.keys(collectionSet.collections).length
	);
}

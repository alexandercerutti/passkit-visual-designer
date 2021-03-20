import * as React from "react";
import "./style.less";
import Pass, { MediaProps } from "../../Pass";
import Modal, { ModalProps } from "../ModalBase";
import CollectionsList from "./CollectionsList";
import CollectionEditor from "./CollectionEditor";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import type { CollectionSet, MediaCollection } from "../../store";
import { v1 as uuid } from "uuid";
import { ModalNavigation } from "./ModalNavigation";
import { createClassName } from "../../utils";

export type CollectionEditOperation = 0b0001 | 0b0010 | 0b0100;
export const CollectionEditCreate = 0b0001;
export const CollectionEditModify = 0b0010;
/* skipping 0b0011 to avoid collisions */
export const CollectionEditDelete = 0b0100;

interface Props extends Omit<ModalProps, "contentUniqueID"> {
	currentLanguage: string;
	mediaName: keyof MediaProps;
	mediaContent: CollectionSet;
	passProps: MediaProps;
	setMediaExportState(enable: boolean): void;
	useCollection(collectionID: string): void;
	updateCollection(collectionID: string, collection: MediaCollection): void;
	requestForLanguageChange(): void;
}

interface State {
	isEditMode: boolean;
	collectionSelected: MediaCollection;
	collectionSelectedID: string;
}

export default class MediaModal extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.onCollectionUse = this.onCollectionUse.bind(this);
		this.onCollectionNameEdit = this.onCollectionNameEdit.bind(this);
		this.onCollectionEditSelect = this.onCollectionEditSelect.bind(this);
		this.onCollectionEditOperation = this.onCollectionEditOperation.bind(this);
		this.shouldToggleEditMode = this.shouldToggleEditMode.bind(this);

		this.state = {
			isEditMode: false,
			collectionSelected: undefined,
			collectionSelectedID: undefined,
		};
	}

	static getDerivedStateFromProps(props: Props, state: State) {
		if (state.isEditMode && !props.mediaContent?.enabled) {
			return {
				...state,
				isEditMode: false,
			};
		}

		return state;
	}

	/**
	 * Sets a collection as edit target
	 * @param collectionID
	 */

	onCollectionEditSelect(collectionID?: string) {
		this.setState({
			collectionSelected: this.props.mediaContent.collections[collectionID],
			collectionSelectedID: collectionID || "",
		});
	}

	/**
	 * Use the selected collectionID as media for
	 * the pass preview.
	 *
	 * @param collectionID
	 */

	onCollectionUse(collectionID: string) {
		return this.props.useCollection(collectionID);
	}

	/**
	 * Apply edit to the collection for the
	 * selected collectionID (if available).
	 *
	 * @param operation
	 * @param collectionID
	 * @param collection
	 */

	onCollectionEditOperation(
		operation: CollectionEditOperation,
		collectionID?: string,
		collection?: MediaCollection
	) {
		if (operation & CollectionEditCreate) {
			return this.props.updateCollection(uuid(), {
				name: undefined,
				resolutions: {},
			});
		}

		if (operation & CollectionEditModify) {
			return this.props.updateCollection(collectionID, collection);
		}

		if (operation & CollectionEditDelete) {
			if (!(Object.keys(this.props.mediaContent.collections).length - 1)) {
				this.setState({
					isEditMode: false,
				});
			}

			return this.props.updateCollection(collectionID, null);
		}
	}

	/**
	 * Changes the name for the selected collectionID
	 *
	 * @param collectionID
	 * @param value
	 */

	onCollectionNameEdit(collectionID: string, value: string) {
		const editedCollection: MediaCollection = {
			name: value,
			resolutions: this.props.mediaContent.collections[collectionID].resolutions,
		};

		this.onCollectionEditOperation(CollectionEditModify, collectionID, editedCollection);
	}

	/**
	 * Conditionally Toggles editMode to show buttons
	 * to edit the collection list
	 */

	shouldToggleEditMode() {
		if (!Object.entries(this.props.mediaContent.collections).length && !this.state.isEditMode) {
			return;
		}

		this.setState((prev) => ({
			isEditMode: !prev.isEditMode,
		}));
	}

	render() {
		const { collectionSelected, collectionSelectedID, isEditMode } = this.state;
		const { mediaContent, mediaName, currentLanguage, passProps } = this.props;
		const collectionsKeys = Object.keys(this.props.mediaContent?.collections || {});

		return (
			<Modal closeModal={this.props.closeModal} contentUniqueID="media-collection">
				<div id="pass-preview">
					<Pass {...passProps} />
				</div>
				<div id="media-collector">
					<header>
						<ModalNavigation
							collectionID={collectionSelectedID}
							onBack={this.onCollectionEditSelect}
							mediaName={mediaName}
							collectionName={collectionSelected?.name || ""}
							onCollectionNameEditComplete={this.onCollectionNameEdit}
						/>
						{(!collectionSelectedID && (
							<span
								onClick={this.shouldToggleEditMode}
								className={createClassName(["edit-button"], {
									disabled: !collectionsKeys.length || !mediaContent.enabled,
								})}
							>
								{isEditMode ? "Done" : "Edit"}
							</span>
						)) ||
							null}
					</header>
					<SwitchTransition mode="out-in">
						<CSSTransition timeout={500} key={collectionSelectedID || ""}>
							{!collectionSelectedID ? (
								<CollectionsList
									media={mediaContent}
									isEditMode={isEditMode}
									setMediaExportState={this.props.setMediaExportState}
									editSelectedCollection={this.onCollectionEditSelect}
									useSelectedCollection={this.onCollectionUse}
									performCollectionsOperation={this.onCollectionEditOperation}
									currentLanguage={currentLanguage}
									requestForLanguageChange={this.props.requestForLanguageChange}
								/>
							) : (
								<CollectionEditor
									collectionID={collectionSelectedID}
									collection={collectionSelected}
									onResolutionChange={this.onCollectionEditOperation}
								/>
							)}
						</CSSTransition>
					</SwitchTransition>
				</div>
			</Modal>
		);
	}
}

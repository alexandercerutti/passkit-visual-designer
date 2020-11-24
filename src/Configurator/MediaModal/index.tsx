import * as React from "react";
import "./style.less";
import { PassKind } from "../../model";
import Pass, { MediaProps } from "../../Pass";
import Modal, { ModalProps } from "../ModalBase";
import CollectionsList from "./CollectionsList";
import CollectionEditor from "./CollectionEditor";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { CollectionSet, MediaCollection } from "../../store/state";
import { v1 as uuid } from "uuid";
import { ModalNavigation } from "./ModalNavigation";

export type CollectionEditOperation = 0b0001 | 0b0010 | 0b0100;
export const CollectionEditCreate = 0b0001;
export const CollectionEditModify = 0b0010;
/* skipping 0b0011 to avoid collisions */
export const CollectionEditDelete = 0b0100;

interface Props extends Omit<ModalProps, "contentUniqueID"> {
	mediaName: keyof MediaProps;
	mediaContent: CollectionSet;
	passProps: MediaProps;
	setMediaExportState(enable: boolean): void;
	useCollection(collectionID: string): void;
	updateCollection(collectionID: string, collection: MediaCollection, editHints?: number): void;
}

interface State {
	isEditMode: boolean;
	editingCollection: string;
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
			editingCollection: "",
		};
	}

	static getDerivedStateFromProps(props: Props, state: State) {
		if (state.isEditMode && !props.mediaContent.enabled) {
			return {
				...state,
				isEditMode: false
			};
		}

		return state;
	}

	/**
	 * Sets a collection as edit target
	 * @param collectionID
	 */

	onCollectionEditSelect(collectionID?: string) {
		console.log("onEdit", collectionID);

		this.setState({
			editingCollection: collectionID || "",
		});
	}

	/**
	 * Use the selected collectionID as media for
	 * the pass preview.
	 *
	 * @param collectionID
	 */

	onCollectionUse(collectionID: string) {
		console.log("onUse", collectionID);
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

	onCollectionEditOperation(operation: CollectionEditOperation, collectionID?: string, collection?: MediaCollection) {
		if (operation & CollectionEditCreate) {
			return this.props.updateCollection(uuid(), {
				name: undefined,
				resolutions: {}
			});
		}

		if (operation & CollectionEditModify) {
			return this.props.updateCollection(collectionID, collection);
		}

		if (operation & CollectionEditDelete) {
			if (!(Object.keys(this.props.mediaContent.collections).length - 1)) {
				this.setState({
					isEditMode: false
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
			resolutions: this.props.mediaContent.collections[collectionID].resolutions
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

		this.setState(prev => ({
			isEditMode: !prev.isEditMode
		}));
	}

	render() {
		const passMediaProps = {
			[this.props.mediaName]: this.props.passProps[this.props.mediaName]
		};

		const collectionsKeys = Object.keys(this.props.mediaContent.collections);

		return (
			<Modal closeModal={this.props.closeModal} contentUniqueID="media-collection">
				<div id="pass-preview">
					<Pass
						kind={PassKind.BOARDING_PASS}
						{...passMediaProps}
					/>
				</div>
				<div id="media-collector">
					<header>
						<ModalNavigation
							collectionID={this.state.editingCollection}
							onBack={this.onCollectionEditSelect}
							mediaName={this.props.mediaName}
							collectionName={this.state.editingCollection && this.props.mediaContent.collections[this.state.editingCollection].name || ""}
							onCollectionNameEditComplete={this.onCollectionNameEdit}
						/>
						{
							!this.state.editingCollection && collectionsKeys.length &&
							<span
								onClick={this.shouldToggleEditMode}
								className={`edit-button ${(!collectionsKeys.length || !this.props.mediaContent.enabled) && "disabled" || ""}`}
							>
								{this.state.isEditMode ? "Done" : "Edit"}
							</span> || null
						}
					</header>
					<SwitchTransition mode="out-in">
						<CSSTransition
							timeout={500}
							key={this.state.editingCollection}
							classNames="fade"
						>
							{!this.state.editingCollection
								?
								<CollectionsList
									media={this.props.mediaContent}
									isEditMode={this.state.isEditMode}
									onMediaExportStateToggle={this.props.setMediaExportState}
									onCollectionEditSelect={this.onCollectionEditSelect}
									onCollectionUse={this.onCollectionUse}
									performCollectionsOperation={this.onCollectionEditOperation}
								/>
								:
								<CollectionEditor
									collectionID={this.state.editingCollection}
									collection={this.props.mediaContent.collections[this.state.editingCollection]}
									onResolutionChange={this.onCollectionEditOperation}
								/>
							}
						</CSSTransition>
					</SwitchTransition>
				</div>
			</Modal>
		);
	}
}

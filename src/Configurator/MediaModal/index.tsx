import * as React from "react";
import "./style.less";
import { PassKind } from "../../model";
import Pass from "../../Pass";
import Modal, { ModalProps } from "../ModalBase";
import CollectionsView from "./CollectionsView";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import CollectionEditor from "./CollectionEditor";
import { ArrowIcon } from "./icons";
import { CollectionSet, IdentifiedResolutions, MediaCollection } from "../../store/state";
import { v1 as uuid } from "uuid";

export type CollectionEditOperation = 0b0001 | 0b0010 | 0b0100;
export const CollectionEditCreate = 0b0001;
export const CollectionEditModify = 0b0010;
/* skipping 0b0011 to avoid collisions */
export const CollectionEditDelete = 0b0100;

interface Props extends Omit<ModalProps, "contentClassName"> {
	mediaName: string;
	collections: CollectionSet;
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
		this.onCollectionEditSelect = this.onCollectionEditSelect.bind(this);
		this.onCollectionEditOperation = this.onCollectionEditOperation.bind(this);

		this.state = {
			isEditMode: false,
			editingCollection: "",
		};
	}

	/**
	 * Sets a collection as edit target
	 * @param name
	 */

	onCollectionEditSelect(collectionID?: string) {
		console.log("onEdit", collectionID);

		this.setState({
			editingCollection: collectionID || "",
		});
	}

	onCollectionUse(collectionID: string) {
		console.log("onUse", collectionID);
		return this.props.useCollection(collectionID);
	}

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
			return this.props.updateCollection(collectionID, null);
		}
	}

	toggleEditMode() {
		this.setState(prev => ({
			isEditMode: !prev.isEditMode
		}));
	}

	render() {
		return (
			<Modal closeModal={this.props.closeModal} contentClassName="media-collection">
				<div id="pass-preview">
					<Pass
						kind={PassKind.BOARDING_PASS}
					/>
				</div>
				<div id="media-collector">
					<header>
						<nav
							className={this.state.editingCollection && "allow-back-nav" || ""}
							onClick={() => this.state.editingCollection && this.onCollectionEditSelect()}
						>
							<ArrowIcon className="back" />
							<span>{this.props.mediaName}</span>
						</nav>
						<span>it</span>
						{
							!this.state.editingCollection && Object.keys(this.props.collections).length &&
							<span
								onClick={() => (
									Object.keys(this.props.collections).filter(key => key !== "activeCollectionID").length &&
									this.toggleEditMode()
								)}
								className={`edit-button ${!Object.keys(this.props.collections).length && "disabled" || ""}`}
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
								<CollectionsView
									collections={this.props.collections}
									isEditMode={this.state.isEditMode}
									onCollectionEditSelect={this.onCollectionEditSelect}
									onCollectionUse={this.onCollectionUse}
									performCollectionsOperation={this.onCollectionEditOperation}
								/>
								:
								<>
									<CollectionEditor
										collectionID={this.state.editingCollection}
										collection={this.props.collections[this.state.editingCollection]}
										onResolutionChange={this.onCollectionEditOperation}
									/>
									<footer>
										Hint: add a new resolution to collection by drag and drop
									</footer>
								</>
							}
						</CSSTransition>
					</SwitchTransition>
				</div>
			</Modal>
		);
	}
}

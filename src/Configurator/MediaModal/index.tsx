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

interface Props extends Omit<ModalProps, "contentClassName"> {
	mediaName: string;
	collections: CollectionSet;
	useCollection(collectionID: string): void;
	updateCollection(collectionID: string, collection: MediaCollection, editHints: number): void;
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
		this.onCollectionChange = this.onCollectionChange.bind(this);
		this.onResolutionChange = this.onResolutionChange.bind(this);

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

	/**
	 * Receives updates to a collection
	 */

	onCollectionChange(collectionID: string, collection: MediaCollection, editHints: number = 0b0011) {
		return this.props.updateCollection(collectionID, collection, editHints);
	}

	/**
	 * Receives, merges and creates a new
	 * collection to be submitted as for store processing.
	 * Uses an editHint to make middleware understand what,
	 * in current existing collection, changed.
	 *
	 * @param collectionID
	 * @param resolutions
	 * @param editHints
	 */

	onResolutionChange(collectionID: string, resolutions: IdentifiedResolutions, editHints: number = 0b0011) {
		const changedCollection: MediaCollection = {
			name: this.props.collections[collectionID].name,
			resolutions,
		};

		return this.props.updateCollection(
			collectionID,
			changedCollection,
			editHints
		);
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
							!this.state.editingCollection &&
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
								/>
								:
								<>
									<CollectionEditor
										collectionID={this.state.editingCollection}
										collection={this.props.collections[this.state.editingCollection]}
										onResolutionChange={this.onResolutionChange}
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

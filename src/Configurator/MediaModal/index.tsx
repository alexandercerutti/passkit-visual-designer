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
	useCollection?(collectionID: string): void;
	updateCollections?(collections: CollectionSet): void;
}

interface State {
	isEditMode: boolean;
	editingCollection: string;
}

export default class MediaModal extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.onCollectionUse = this.onCollectionUse.bind(this);
		this.onCollectionEdit = this.onCollectionEdit.bind(this);
		this.onCollectionChange = this.onCollectionChange.bind(this);

		this.state = {
			isEditMode: false,
			editingCollection: "",
		};
	}

	/**
	 * Sets a collection as edit target
	 * @param name
	 */

	onCollectionEdit(name?: string) {
		console.log("onEdit", name);

		this.setState({
			editingCollection: name || "",
		});
	}

	onCollectionUse(name: string) {
		console.log("onUse", name);
	}

	/**
	 * Receives updates to a collection
	 */

	onCollectionChange(collectionID: string, resolutions: IdentifiedResolutions) {
		return this.props.updateCollections(
			Object.assign({ ...this.props.collections }, {
				[collectionID]: {
					name: this.props.collections[collectionID].name,
					resolutions,
				} as MediaCollection
			})
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
							onClick={() => this.state.editingCollection && this.onCollectionEdit()}
						>
							<ArrowIcon className="back" />
							<span>{this.props.mediaName}</span>
						</nav>
						<span>it</span>
						{
							!this.state.editingCollection &&
							<span onClick={() => this.props.collections.length && this.toggleEditMode()} className={`edit-button ${!this.props.collections.length && "disabled" || ""}`}>
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
									onCollectionEdit={this.onCollectionEdit}
									onCollectionUse={this.onCollectionUse}
								/>
								:
								<>
									<CollectionEditor
										collectionID={this.state.editingCollection}
										collection={this.props.collections[this.state.editingCollection]}
										onBack={() => this.onCollectionEdit("")}
										onCollectionChange={this.onCollectionChange}
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

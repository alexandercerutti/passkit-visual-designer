import * as React from "react";
import "./style.less";
import { PassKind } from "../../model";
import Pass from "../../Pass";
import Modal, { ModalProps } from "../ModalBase";
import CollectionsView from "./CollectionsView";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export interface Collection {
	name: string;
	srcset: string[];
}

interface Props extends Omit<ModalProps, "contentClassName"> {
	mediaName: string;
	collections: Collection[];
	updateCollections?(collections: Collection[]): void;
}

interface State {
	editingCollection: string;
}

export default class MediaModal extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.onCollectionUse = this.onCollectionUse.bind(this);
		this.onCollectionEdit = this.onCollectionEdit.bind(this);

		this.state = {
			editingCollection: "",
		};
	}

	onCollectionEdit(name: string) {
		console.log("onEdit", name);

		this.setState({
			editingCollection: name,
		});
	}

	onCollectionUse(name: string) {
		console.log("onUse", name);
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
						<span>{this.props.mediaName}</span>
						<span>it</span>
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
									onCollectionEdit={this.onCollectionEdit}
									onCollectionUse={this.onCollectionUse}
								/>
								:
								<div></div>
							}
						</CSSTransition>
					</SwitchTransition>
				</div>
			</Modal>
		);
	}
}

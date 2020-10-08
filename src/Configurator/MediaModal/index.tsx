import * as React from "react";
import "./style.less";
import { PassKind } from "../../model";
import Pass from "../../Pass";
import Modal, { ModalProps } from "../ModalBase";
import CollectionsView from "./CollectionsView";

export interface Collection {
	name: string;
	srcset: string[];
}

interface Props extends Omit<ModalProps, "contentClassName"> {
	mediaName: string;
	collections: Collection[];
	updateCollections?(collections: Collection[]): void;
}

export default class MediaModal extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
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
					<CollectionsView
						collections={this.props.collections}
						onCollectionEdit={(name) => console.log("onEdit", name)}
						onCollectionUse={(name) => console.log("onUse", name)}
					/>
				</div>
			</Modal>
		);
	}
}

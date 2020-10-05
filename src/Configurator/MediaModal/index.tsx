import * as React from "react";
import "./style.less";
import { PassKind } from "../../model";
import Pass from "../../Pass";
import Modal, { ModalProps } from "../ModalBase";
import CollectionsView from "./CollectionsView";

interface Props extends Omit<ModalProps, "contentClassName"> {
	mediaName: string;
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
						collections={[{
							name: "Background 1",
							srcset: [

							]
						}]}
					/>
				</div>
			</Modal>
		);
	}
}

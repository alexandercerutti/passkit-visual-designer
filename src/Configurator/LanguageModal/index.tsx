import * as React from "react";
import "./style.less";
import Modal from "../ModalBase";

interface Props {
	closeModal(): void;
}

export default function LanguageModal(props: Props) {
	return (
		<Modal
			closeModal={props.closeModal}
			contentUniqueID="language"
		>

		</Modal>
	);
}

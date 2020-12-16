import * as React from "react";
import Modal, { ModalProps } from "../ModalBase";
import "./style.less";

interface Props extends Omit<ModalProps, "contentUniqueID"> {
	currentLanguage: string;
	availableTranslations: [string, string][];
	requestForLanguageChange(): void;
	onTranslationsChange(): void;
}

export default function TranslationsModal(props: Props) {
	const translations = props.availableTranslations.map(([placeholder, value]) => (
		<React.Fragment key={`trl-${placeholder}`}>
			<input type="text" value={placeholder || ""} />
			<input type="text" value={value || ""} />
		</React.Fragment>
	));

	return (
		<Modal closeModal={props.closeModal} contentUniqueID="translations">
			<h2>Translations</h2>
			<div id="translations-content">
				<header>
					<div>Placeholder</div>
					<div>Value</div>
				</header>
				{translations}
			</div>
			<footer>
				<span
					id="select-lang"
					onClick={props.requestForLanguageChange}
					title="Click here to switch language"
				>
					{props.currentLanguage}
				</span>
			</footer>
		</Modal>
	);
}

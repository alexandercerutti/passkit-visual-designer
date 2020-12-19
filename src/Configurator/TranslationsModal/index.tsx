import * as React from "react";
import { TranslationsSet } from "../../store";
import Modal, { ModalProps } from "../ModalBase";
import { Switcher } from "../Switcher";
import { DeleteFieldIcon } from "./icons";
import "./style.less";

const TranslationChangePlaceholder = 0b001;
const TranslationChangeValue = 0b010;
export type TranslationChangeOps = typeof TranslationChangePlaceholder | typeof TranslationChangeValue;

interface Props extends Omit<ModalProps, "contentUniqueID"> {
	currentLanguage: string;
	availableTranslations: TranslationsSet;
	requestForLanguageChange(): void;
	editTranslation(id: string, placeholder: string, value: string): void;
	removeTranslation(id: string): void;
	addTranslation(): void;
	setExportState(enabled: boolean): void;
}

export default function TranslationsModal(props: Props) {
	const onInputValueChange = React.useCallback((id: string, changeOP: TranslationChangeOps, changedValue: string) => {
		const newPayload: TranslationsSet["translations"][0] = [];

		if (changeOP & TranslationChangeValue) {
			newPayload.push(props.availableTranslations.translations[id][0], changedValue);
		} else if (changeOP & TranslationChangePlaceholder) {
			newPayload.push(changedValue, props.availableTranslations.translations[id][1]);
		}

		props.editTranslation(id, ...newPayload);
	}, [props.availableTranslations]);

	const translations = Object.entries(props.availableTranslations.translations).map(([id, [placeholder, value]], index) => (
		<React.Fragment key={`trl-r${index}`}>
			<input type="text" value={placeholder || ""} onChange={(e) => onInputValueChange(id, TranslationChangePlaceholder, e.currentTarget.value)} />
			<input type="text" value={value || ""} onChange={(e) => onInputValueChange(id, TranslationChangeValue, e.currentTarget.value)} />
			<DeleteFieldIcon onClick={() => props.removeTranslation(id)} />
		</React.Fragment>
	));

	return (
		<Modal closeModal={props.closeModal} contentUniqueID="translations">
			<h2>Translations</h2>
			<div id="translations-content" data-disabled={!props.availableTranslations.enabled}>
				<header>
					<div>Placeholder</div>
					<div>Value</div>
				</header>
				{translations}
			</div>
			<footer>
				<Switcher
					labelPosition="after"
					onToggle={props.setExportState}
					checked={props.availableTranslations.enabled}
				>
					Export
				</Switcher>
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

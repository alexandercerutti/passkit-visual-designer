import * as React from "react";
import { TranslationsSet } from "../../store";
import CommittableTextInput from "../CommittableTextInput";
import Modal, { ModalProps } from "../ModalBase";
import { Switcher } from "../Switcher";
import { DeleteIcon, AddIcon } from "./icons";
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
	const isEnabled = props.availableTranslations?.enabled ?? true;
	const translations = isEnabled && props.availableTranslations?.translations || {};

	const onCommit = React.useCallback((id: string, changeOP: TranslationChangeOps, content: string) => {
		const currentSet = props.availableTranslations.translations[id];

		const placeholder = (
			changeOP & TranslationChangePlaceholder &&
			content !== currentSet[0] &&
			content
		) || currentSet[0];

		const value = (
			changeOP & TranslationChangeValue &&
			content !== currentSet[1] &&
			content
		) || currentSet[1];

		props.editTranslation(id, placeholder, value);
	}, [props.availableTranslations]);

	const translationsFragments = Object.entries(translations).map(([id, [placeholder, value]], index) => (
		<React.Fragment key={`trl-r${index}`}>
			<CommittableTextInput
				defaultValue={placeholder || ""}
				placeholder="Insert localizable string placeholder"
				commit={(value) => onCommit(id, TranslationChangePlaceholder, value)}
			/>
			<CommittableTextInput
				defaultValue={value || ""}
				placeholder="Insert value for this language"
				commit={(value) => onCommit(id, TranslationChangeValue, value)}
			/>
			<DeleteIcon onClick={() => props.removeTranslation(id)} />
		</React.Fragment>
	));

	return (
		<Modal closeModal={props.closeModal} contentUniqueID="translations">
			<header>
				<h2>Translations</h2>
				<AddIcon
					onClick={() => props.addTranslation()}
					data-disabled={!isEnabled}
				/>
			</header>
			<div id="translations-content" data-disabled={!isEnabled}>
				<header>
					<div>Placeholder</div>
					<div>Value</div>
				</header>
				{translationsFragments}
			</div>
			<footer>
				<Switcher
					labelPosition="after"
					onToggle={props.setExportState}
					checked={isEnabled}
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

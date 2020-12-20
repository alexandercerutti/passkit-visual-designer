import * as React from "react";
import { TranslationsSet } from "../../store";
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
	const onKeyDownHandler = React.useCallback(({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
		if (key === "Enter" || key === "Escape") {
			currentTarget.blur();
		}
	}, []);

	const onBlurHandler = React.useCallback((id: string, changeOP: TranslationChangeOps, content: string) => {
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

	const translations = Object.entries(props.availableTranslations.translations).map(([id, [placeholder, value]], index) => (
		<React.Fragment key={`trl-r${index}`}>
			<input
				type="text"
				defaultValue={placeholder || ""}
				placeholder="Insert localizable string placeholder"
				onKeyDown={onKeyDownHandler}
				onBlur={({ currentTarget }) => onBlurHandler(id, TranslationChangePlaceholder, currentTarget.value)}
			/>
			<input
				type="text"
				defaultValue={value || ""}
				placeholder="Insert value for this language"
				onKeyDown={onKeyDownHandler}
				onBlur={({ currentTarget }) => onBlurHandler(id, TranslationChangeValue, currentTarget.value)}
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
					data-disabled={!props.availableTranslations.enabled}
				/>
			</header>
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

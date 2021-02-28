import * as React from "react";
import "./style.less";
import Pass, { PassProps } from "../../Pass";
import InteractionContext from "../../Pass/InteractionContext";
import { createClassName } from "../../utils";
import CommittableTextInput from "../CommittableTextInput";
import type { TranslationsSet } from "../../store";
import { PassFieldKeys } from "../../Pass/constants";

export interface ViewerProps extends Pick<PassProps, "registerField" | "onFieldSelect" | "showBack"> {
	passProps: PassProps;
	translationSet: TranslationsSet;
	showEmpty: boolean;
	onVoidClick(e: React.MouseEvent): void;
	projectTitle?: string;
	changeProjectTitle(title: string): void;
}

export default function Viewer(props: ViewerProps) {
	const { changeProjectTitle, onVoidClick, projectTitle = "", showBack, registerField, onFieldSelect, passProps } = props;
	const registrationProps = { registerField, onFieldSelect };

	const viewerCN = createClassName(["viewer"], {
		"no-empty": !props.showEmpty
	});

	const passUIProps = { ...passProps };

	if (props.translationSet?.enabled) {
		const translations = Object.values(props.translationSet.translations);

		Object.assign(passUIProps, {
			primaryFields: localizeFieldContent(passProps["primaryFields"], translations),
			secondaryFields: localizeFieldContent(passProps["secondaryFields"], translations),
			auxiliaryFields: localizeFieldContent(passProps["auxiliaryFields"], translations),
			backFields: localizeFieldContent(passProps["backFields"], translations),
			headerFields: localizeFieldContent(passProps["headerFields"], translations),
		});
	}

	return (
		<div className={viewerCN} onClick={onVoidClick}>
			<div className="project-title-box">
				<CommittableTextInput
					selectOnFocus
					defaultValue={projectTitle}
					placeholder="Untitled Project"
					commit={changeProjectTitle}
				/>
			</div>
			<InteractionContext.Provider value={registrationProps}>
				<Pass
					{...passUIProps}
					showBack={showBack}
				/>
			</InteractionContext.Provider>
		</div>
	);
}

function localizeFieldContent(field: PassFieldKeys[], translations: Array<TranslationsSet["translations"][0]>) {
	if (!field) {
		return field;
	}

	return field.reduce((acc, field) => {
		const localizableElements = { label: field.label, value: field.value };

		return [
			...acc,
			Object.assign(
				{...field },
				Object.entries(localizableElements).reduce((acc, [key, element]) => {
					if (!element) {
						return acc;
					}

					return {
						...acc,
						[key]: translations.find(([placeholder]) => placeholder === element)?.[1] ?? element,
					};
				}, {})
			),
		];
	}, []);
}

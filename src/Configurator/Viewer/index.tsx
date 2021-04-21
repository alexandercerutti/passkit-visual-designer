import * as React from "react";
import "./style.less";
import Pass, { PassProps, Constants, PassMixedProps } from "@pkvd/pass";
import { createClassName } from "../../utils";
import CommittableTextInput from "../CommittableTextInput";
import type { TranslationsSet } from "../../store";

type PassField = Constants.PassField;

export interface ViewerProps extends Pick<PassProps, "showBack"> {
	passProps: PassMixedProps;
	translationSet: TranslationsSet;
	showEmpty: boolean;
	onVoidClick(e: React.MouseEvent): void;
	projectTitle?: string;
	changeProjectTitle(title: string): void;
}

export default function Viewer(props: ViewerProps) {
	const { changeProjectTitle, onVoidClick, projectTitle = "", showBack, passProps } = props;

	const viewerCN = createClassName(["viewer"], {
		"no-empty": !props.showEmpty,
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
			<Pass {...passUIProps} showBack={showBack} />
		</div>
	);
}

function localizeFieldContent(
	field: PassField[],
	translations: Array<TranslationsSet["translations"][0]>
) {
	if (!field) {
		return field;
	}

	return field.reduce((acc, field) => {
		const localizableElements = { label: field.label, value: field.value };

		return [
			...acc,
			Object.assign(
				{ ...field },
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

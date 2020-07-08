import * as React from "react";
import "./style.less";
import { PKTextAlignment, PKDateStyle, PKDataDetectorType } from "../../../../../../passes/constants";
import { FieldProperties } from "../FieldProperties";
import FieldStringPropertyPanel from "./FieldPropertyPanels/String";
import FieldCheckboxPropertyPanel from "./FieldPropertyPanels/Checkbox";
import FieldEnumPropertyPanel from "./FieldPropertyPanels/Enum";

interface FieldPropertiesEditListProps {
	onValueChange<T>(prop: string, value: T): void;
}

export default function FieldPropertiesEditList(props: FieldPropertiesEditListProps) {
	const properties = FieldProperties.map(({ name, type, placeholder, defaultValue }) => {
		if (isPanelTypeEnum(type)) {
			return (
				<FieldEnumPropertyPanel
					key={name}
					name={name}
					options={type}
					onValueChange={props.onValueChange}
					defaultValue={defaultValue}
				/>
			);
		}

		if (isPanelTypeString(type)) {
			return (
				<FieldStringPropertyPanel
					key={name}
					name={name}
					placeholder={placeholder}
					onValueChange={props.onValueChange}
				/>
			);
		}

		if (isPanelTypeCheckbox(type)) {
			return (
				<FieldCheckboxPropertyPanel
					key={name}
					name={name}
					onValueChange={props.onValueChange}
				/>
			);
		}
	});

	return (
		<div className="field-properties-edit-list">
			{properties}
		</div>
	);
}

function isPanelTypeEnum(type: Object) {
	return type === PKTextAlignment || type === PKDateStyle || type === PKDataDetectorType;
}

function isPanelTypeString(type: Object) {
	return type === String;
}

function isPanelTypeCheckbox(type: Object) {
	return type === Boolean;
}

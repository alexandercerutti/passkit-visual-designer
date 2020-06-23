import * as React from "react";
import "./style.less";
import { PKTextAlignment, PKDateStyle, PKDataDetectorType } from "../../../../../../passes/constants";
import { AllFieldProperties } from "../FieldProperties";
import FieldStringPropertyPanel from "./FieldPropertyPanels/String";
import FieldCheckboxPropertyPanel from "./FieldPropertyPanels/Checkbox";
import FieldEnumPropertyPanel from "./FieldPropertyPanels/Enum";

interface FieldPropertiesEditListProps {
	usedProperties?: string[];
}

export default function FieldPropertiesEditList(props: FieldPropertiesEditListProps) {
	const properties = props.usedProperties.map((element) => {
		const property = AllFieldProperties[element];

		if (isPanelTypeEnum(property.type)) {
			return (
				<FieldEnumPropertyPanel
					key={element}
					name={element}
					options={AllFieldProperties[element].type}
					onValueChange={() => console.log("attempting to change enum")}
				/>
			);
		}

		if (isPanelTypeString(property.type)) {
			return (
				<FieldStringPropertyPanel
					key={element}
					name={element}
					onValueChange={() => console.log("attempting to change string")}
				/>
			);
		}

		if (isPanelTypeCheckbox(property.type)) {
			return (
				<FieldCheckboxPropertyPanel
					key={element}
					name={element}
					onValueChange={() => console.log("attempting to change checkbox")}
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

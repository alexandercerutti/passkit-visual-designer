import * as React from "react";
import "./style.less";
import { Pass } from "@pkvd/passkit-types";
import { FieldPropertiesDetails } from "../../FieldsPreviewPage/DrawerElement/FieldPropertiesDetails";
import FieldStringPropertyPanel from "./FieldPropertyPanels/String";
import FieldCheckboxPropertyPanel from "./FieldPropertyPanels/Checkbox";
import FieldEnumPropertyPanel from "./FieldPropertyPanels/Enum";

interface FieldPropertiesEditListProps {
	data: Pass.PassFieldContent;
	onValueChange<T>(prop: string, value: T): void;
}

export default function FieldPropertiesEditList(props: FieldPropertiesEditListProps) {
	const properties = FieldPropertiesDetails.map(({ name, type, placeholder, defaultValue }) => {
		const valueFromData = props.data[name];

		if (isPanelTypeEnum(type)) {
			return (
				<FieldEnumPropertyPanel
					key={name}
					name={name}
					options={type}
					onValueChange={props.onValueChange}
					value={(valueFromData as string) ?? defaultValue}
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
					value={valueFromData as string}
				/>
			);
		}

		if (isPanelTypeCheckbox(type)) {
			return (
				<FieldCheckboxPropertyPanel
					key={name}
					name={name}
					value={valueFromData as boolean}
					onValueChange={props.onValueChange}
				/>
			);
		}
	});

	return <div className="field-properties-edit-list">{properties}</div>;
}

function isPanelTypeEnum(type: Object) {
	return (
		type === Pass.PKTextAlignment || type === Pass.PKDateStyle || type === Pass.PKDataDetectorType
	);
}

function isPanelTypeString(type: Object) {
	return type === String;
}

function isPanelTypeCheckbox(type: Object) {
	return type === Boolean;
}

import * as React from "react";
import "./style.less";
import FieldPropertiesEditList from "./FieldPropertiesEditList";
import FieldOptionsBar from "./FieldOptionsBar";
import FieldPreview from "../FieldPreview";
import { FieldProps } from "../../../../../passes/Areas/components/Field";

interface FieldsDrawerElementProps {
	onFieldDelete(key: string): void;
	onFieldOrderChange(fromIndex: number, of: number): void;
	elementData: FieldProps;
	index: number;
	isUpperBoundary: boolean;
	isLowerBoundary: boolean;
}

export default function FieldsDrawerElement(props: FieldsDrawerElementProps) {
	const [usedProperties, setUsedProperties] = React.useState([
		"key", "value"
	]);

	return (
		<div
			className="field-edit-item"
			data-key={props.elementData.fieldKey}
			key={props.elementData.fieldKey}
		>
			{/* <FieldPropertiesEditList
				usedProperties={usedProperties}
			/> */}
			<FieldPreview
				previewData={props.elementData}
				isFieldHidden={false}
			/>
			<FieldOptionsBar
				deleteField={props.onFieldDelete}
				updateUsedProperties={setUsedProperties}
				changeFieldOrder={props.onFieldOrderChange}
				usedProperties={usedProperties}
				fieldKey={props.elementData.fieldKey}
				fieldIndex={props.index}
				isUpperBoundary={props.isUpperBoundary}
				isLowerBoundary={props.isLowerBoundary}
			/>
		</div>
	);
}

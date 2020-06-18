import * as React from "react";
import FieldPropertiesEditList from "./components/FieldPropertiesEditList";
import FieldOptionsBar from "./components/FieldOptionsBar";

interface FieldsDrawerElementProps {
	onFieldDelete(key: string): void;
	onFieldOrderChange(fromIndex: number, of: number): void;
	fieldKey: string;
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
			data-key={props.fieldKey}
			key={props.fieldKey}
		>
			<FieldPropertiesEditList
				usedProperties={usedProperties}
			/>
			<FieldOptionsBar
				deleteField={props.onFieldDelete}
				updateUsedProperties={setUsedProperties}
				changeFieldOrder={props.onFieldOrderChange}
				usedProperties={usedProperties}
				fieldKey={props.fieldKey}
				fieldIndex={props.index}
				isUpperBoundary={props.isUpperBoundary}
				isLowerBoundary={props.isLowerBoundary}
			/>
		</div>
	);
}

import * as React from "react";
import FieldPropertiesList from "./FieldPropertiesList";
import FieldOptionsBar from "./FieldOptionsBar";

interface FieldsDrawerElementProps {
	onFieldDelete(key: string): void;
	fieldKey: string;
}

export default function FieldsDrawerElement(props: FieldsDrawerElementProps) {
	const [usedProperties, setUsedProperties] = React.useState([
		"key", "value"
	]);

	return (
		<div className={`field-edit-item field-${props.fieldKey}`} key={props.fieldKey}>
			<FieldPropertiesList usedProperties={usedProperties} />
			<FieldOptionsBar
				deleteField={props.onFieldDelete}
				updateUsedProperties={setUsedProperties}
				usedProperties={usedProperties}
				fieldKey={props.fieldKey}
			/>
		</div>
	);
}

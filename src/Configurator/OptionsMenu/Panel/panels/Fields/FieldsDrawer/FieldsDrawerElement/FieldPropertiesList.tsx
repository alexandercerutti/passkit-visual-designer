import * as React from "react";

interface FieldPropertyListProps {
	usedProperties?: string[];
}

export default function FieldPropertiesList(props: FieldPropertyListProps) {
	const properties = props.usedProperties.map((element) => (
		<div key={element}>{element}</div>
	));

	return (
		<div className="field-properties-list">
			{properties}
		</div>
	);
}

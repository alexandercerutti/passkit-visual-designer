import * as React from "react";
import "./style.less";
import { PKTextAlignment, PKDateStyle, PKDataDetectorType } from "../../../../../../../../../passes/constants";
import { AllFieldProperties } from "../FieldProperties";

interface FieldPropertiesEditListProps {
	usedProperties?: string[];
}

export default function FieldPropertiesEditList(props: FieldPropertiesEditListProps) {
	const properties = props.usedProperties.map((element) => {
		const PropertyArea = switchPropertyTypePanel(element);

		return (
			<PropertyArea
				key={element}
			/>
		);
	});

	return (
		<div className="field-properties-edit-list">
			{properties}
		</div>
	);
}

function switchPropertyTypePanel(elementKey: string): React.FC<any> {
	switch (AllFieldProperties[elementKey].type) {
		case String:
			return () => <div>ImmaStreeeeng</div>;
		case Boolean:
			return () => <div>ImmaBollean</div>;
		case PKTextAlignment:
			return () => <div />;
		case PKDateStyle:
			return () => <div />;
		case PKDataDetectorType:
			return () => <div />;
		default:
			return () => null;
	}
}

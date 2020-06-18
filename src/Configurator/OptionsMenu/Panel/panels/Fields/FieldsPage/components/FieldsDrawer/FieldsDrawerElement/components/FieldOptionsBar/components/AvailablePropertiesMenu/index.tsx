import * as React from "react";
import "./style.less";
import { OptionalFieldProperties } from "../../../../FieldProperties";

interface AvailablePropertiesMenuProps {
	className?: string;
	appliedProperties?: string[];

	onPropertySelect: (propertyName: string[]) => void;
}

export default function AvailablePropertiesMenu({ appliedProperties = [], onPropertySelect, className }: AvailablePropertiesMenuProps) {
	const OFPKeys = Object.keys(OptionalFieldProperties);
	const properties = (
		!appliedProperties.length && OFPKeys ||
		OFPKeys.filter(prop => !appliedProperties.includes(prop))
	).map(prop => (
		<div key={prop} className="field-property" onClick={() => onPropertySelect([...appliedProperties, prop])}>
			{prop}
		</div>
	));

	return (
		<div className={`field-prop-choice-overlay ${className}`} onClick={() => onPropertySelect(null)}>
			<div className="field-new-property-list">
				{properties}
			</div>
		</div>
	);
}

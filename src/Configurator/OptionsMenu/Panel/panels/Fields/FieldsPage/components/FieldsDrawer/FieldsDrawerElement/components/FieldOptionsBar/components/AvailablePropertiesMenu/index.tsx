import * as React from "react";
import "./style.less";
import { OptionalFieldProperties } from "../../../../FieldProperties";

interface AvailablePropertiesMenuProps {
	className?: string;
	appliedProperties?: string[];

	onPropertySelect: (propertyName: string[]) => void;
}

export default function AvailablePropertiesMenu({ appliedProperties = [], onPropertySelect, className }: AvailablePropertiesMenuProps) {
	const properties = Object.keys(OptionalFieldProperties).reduce<React.ReactElement[]>((acc, current) => {
		if (appliedProperties.includes(current)) {
			return acc;
		}

		return [...acc, (
			<div key={current} className="field-property" onClick={() => onPropertySelect([...appliedProperties, current])}>
				{current}
			</div>
		)];
	}, []);

	return (
		<div className={`field-prop-choice-overlay ${className}`} onClick={() => onPropertySelect(null)}>
			<div className="field-new-property-list">
				{properties}
			</div>
		</div>
	);
}

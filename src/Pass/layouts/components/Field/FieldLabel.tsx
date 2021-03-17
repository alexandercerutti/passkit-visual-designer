import * as React from "react";
import { composeLabelValueStylesFromProps, FieldProperties, FieldTypes } from "./fieldCommons";
import { SelectableComponent } from "../../sections/useRegistrations";

type LabelProps = Partial<SelectableComponent<never>> & {
	fieldData: Partial<FieldProperties<FieldTypes.LABEL>>;
};

export default function FieldLabel(props: LabelProps) {
	const { fieldData, onClick } = props;
	const style = composeLabelValueStylesFromProps(fieldData, "label");

	return (
		<span className="label" style={style} onClick={onClick ?? null}>
			{fieldData.label || ""}
		</span>
	);
}

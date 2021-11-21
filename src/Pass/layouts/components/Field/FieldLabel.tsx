import * as React from "react";
import { getCSSFromFieldProps, FieldProperties, FieldTypes } from "./fieldCommons";
import { SelectableComponent } from "../../sections/useFieldRegistration";

type LabelProps = Partial<SelectableComponent<never>> & {
	fieldData: Partial<FieldProperties<FieldTypes.LABEL>>;
};

export default function FieldLabel(props: LabelProps) {
	const { fieldData, onClick } = props;
	const style = getCSSFromFieldProps(fieldData, "label");

	return (
		<span className="label" style={style} onClick={onClick ?? null}>
			{fieldData.label || ""}
		</span>
	);
}

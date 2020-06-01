import * as React from "react";
import { composeLabelValueStylesFromProps, FieldProperties, FieldTypes } from "./fieldCommons";
import { SelectableComponent } from "../../useRegistrations";

type LabelProps = FieldProperties<FieldTypes.LABEL> & Partial<SelectableComponent<never>>;

export default function PureFieldLabel(props: LabelProps) {
	const style = composeLabelValueStylesFromProps(props, "label");

	return (
		<span
			className="label"
			style={style}
			onClick={props.onClick ?? null}
		>
			{props.label || ""}
		</span>
	);
}

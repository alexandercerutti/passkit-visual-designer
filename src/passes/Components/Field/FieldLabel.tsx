import * as React from "react";
import withRegistration from "../withRegistration";
import withFallback from "../EmptyField/withFallback";
import { composeLabelValueStylesFromProps, FieldProperties } from "./fieldCommons";
import { FieldKind } from "../../../model";

export interface LabelProps extends FieldProperties {
	labelColor?: string;
	label?: string;
}

export function PureFieldLabel(props: LabelProps) {
	const style = composeLabelValueStylesFromProps(props, "label");

	return (
		<span
			className="label"
			style={style}
			onClick={() => props.onClick?.(props.id)}
		>
			{props.label || ""}
		</span>
	);
}

export const FieldLabel = withRegistration(withFallback(PureFieldLabel, ["label", "fieldKey"]), FieldKind.FIELDS);

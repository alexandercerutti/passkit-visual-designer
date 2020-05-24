import * as React from "react";
import withFallback from "../EmptyField/withFallback";
import { composeLabelValueStylesFromProps, FieldProperties } from "./fieldCommons";

export interface LabelProps extends FieldProperties {
	labelColor?: string;
	label?: string;
}

export default function PureFieldLabel(props: LabelProps) {
	const style = composeLabelValueStylesFromProps(props, "label");

	return (
		<span
			className="label"
			style={style}
		>
			{props.label || ""}
		</span>
	);
}

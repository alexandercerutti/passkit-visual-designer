import * as React from "react";
import withRegistration, { RegistrableComponent } from "../withRegistration";
import withFallback from "../EmptyField/withFallback";
import { FieldKind } from "../../../model";
import "./fields.less";
import { PKTextAlignment, PKDataDetectorType, PKDateStyle } from "../../constants";

export interface FieldSetProps extends RegistrableComponent {
	className?: string;
	style?: React.CSSProperties;
	labelColor?: string;
	textColor?: string;
	fieldKey: string;
	label?: string;
	value: any;

	// to be implemented
	textAlignment?: PKTextAlignment;
	dataDetectorTypes?: PKDataDetectorType;
	changeMessage?: string; // check for @s
	dateStyle?: PKDateStyle;
	timeStyle?: PKDateStyle;
}

export function PureFieldSet(props: FieldSetProps) {
	return (
		<div style={props.style || {}} className={`${props.className || ""} field field${props.fieldKey && `-${props.fieldKey}`}`.trim()}>
			<span className="label" style={{ color: props.labelColor || "#000" }}>
				{props.label || ""}
			</span>
			<span className="value" style={{ color: props.textColor || "#000", overflow: "hidden", textOverflow: "ellipsis" }}>
				{props.value}
			</span>
		</div>
	);
}

export default withRegistration(withFallback(PureFieldSet, ["value", "fieldKey"]), FieldKind.FIELDS);

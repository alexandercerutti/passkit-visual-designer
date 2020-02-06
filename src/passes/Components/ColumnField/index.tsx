import * as React from "react";
import withRegistration, { RegistrableComponent } from "../withRegistration";
import withFallback from "../EmptyField/withFallback";
import { FieldKind } from "../../../model";
import "./fields.less";
import { PKTextAlignment, PKDataDetectorType, PKDateStyle } from "../../constants";

export interface FieldSetProps extends RegistrableComponent {
	className?: string;
	style?: React.CSSProperties;
	fieldKey: string;

	// to be implemented
	textAlignment?: PKTextAlignment;
	dataDetectorTypes?: PKDataDetectorType;
	changeMessage?: string; // check for @s
	dateStyle?: PKDateStyle;
	timeStyle?: PKDateStyle;
}

export interface LabelProps extends FieldSetProps {
	labelColor?: string;
	label?: string;
}

export interface ValueProps extends FieldSetProps {
	value: any;
	textColor?: string;
}

export function PureFieldSet(props: LabelProps & ValueProps) {
	return (
		<div style={props.style || {}} className={`${props.className || ""} field field${props.fieldKey && `-${props.fieldKey}`}`.trim()}>
			<PureFieldLabel {...props} />
			<PureFieldValue {...props} />
		</div>
	);
}

export function PureFieldLabel(props: LabelProps) {
	return (
		<span className="label" style={{ color: props.labelColor || "#000" }}>
			{props.label || ""}
		</span>
	);
}

export function PureFieldValue(props: ValueProps) {
	return (
		<span className="value" style={{ color: props.textColor || "#000", overflow: "hidden", textOverflow: "ellipsis" }}>
			{props.value}
		</span>
	);
}

export const FieldSet = withRegistration(withFallback(PureFieldSet, ["value", "fieldKey"]), FieldKind.FIELDS);
export const FieldLabel = withRegistration(withFallback(PureFieldLabel, ["label", "fieldKey"]), FieldKind.FIELDS);
export const FieldValue = withRegistration(withFallback(PureFieldValue, ["value", "fieldKey"]), FieldKind.FIELDS);

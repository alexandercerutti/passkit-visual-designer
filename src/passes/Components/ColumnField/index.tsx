import * as React from "react";
import withRegistration, { RegistrableComponent, onSelect } from "../withRegistration";
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
		<div
			style={props.style || {}}
			className={`${props.className || ""} field field${props.fieldKey && `-${props.fieldKey}`}`.trim()}
		>
			<PureFieldLabel {...props} />
			<PureFieldValue {...props} />
		</div>
	);
}

function PureFieldLabel(props: LabelProps) {
	const style = composeLabelValueStylesFromProps(props, "label");

	return (
		<span
			className="label"
			style={style}
			onClick={() => props.onClick(props.id)}
		>
			{props.label || ""}
		</span>
	);
}

function PureFieldValue(props: ValueProps) {
	const style = composeLabelValueStylesFromProps(props, "label");

	const parsedValue = getValueFromProps(props);

	return (
		<span className="value" style={style}>
			{parsedValue}
		</span>
	);
}

function composeLabelValueStylesFromProps(props: Partial<LabelProps & ValueProps>, origin: "label" | "value"): React.CSSProperties {
	const textAlignment = props.textAlignment || PKTextAlignment.Natural;

	return {
		textAlign: textAlignment,
		color: String(origin === "value" && props.textColor || props.labelColor) || "#000",
		overflow: "hidden",
		textOverflow: "ellipsis",
	}
}

function getValueFromProps(props: ValueProps) {
	const valueAsDate = new Date(props.value);

	const shouldShowDate = (
		props.dateStyle !== undefined &&
		props.dateStyle !== PKDateStyle.None
	);
	const shouldShowTime = (
		props.timeStyle !== undefined &&
		props.timeStyle !== PKDateStyle.None
	);

	if (isNaN(valueAsDate.getTime()) || !(shouldShowTime && shouldShowDate)) {
		/**
		 * Date parsing failed ("Invalid date").
		 * Or it doesn't have to be parsed as date
		 * We are returning directly the value
		 * without performing any kind of parsing.
		 */
		return props.value;
	}

	const timeValues = [];

	if (shouldShowDate) {
		timeValues.push(getDateValueFromDateStyle(props.dateStyle, props.value));
	}

	if (shouldShowTime) {
		timeValues.push(getTimeValueFromTimeStyle(props.timeStyle, props.value));
	}

	return timeValues.join(" ");
}

function getDateValueFromDateStyle(dateStyle: PKDateStyle, value: Date) {
	switch (dateStyle) {
		case PKDateStyle.Short:
			// @TODO: Parse Date as short
			return value;
		case PKDateStyle.Medium:
			// @TODO: Parse Date as medium
			return value;
		case PKDateStyle.Long:
			// @TODO: Parse Date as long
			return value;
		case PKDateStyle.Full:
			// @TODO: Parse Date as full
			return value;
		default:
			return value;
	}
}

function getTimeValueFromTimeStyle(timeStyle: PKDateStyle, value: Date) {
	switch (timeStyle) {
		case PKDateStyle.Short:
			// @TODO: Parse Date as short
			return value;
		case PKDateStyle.Medium:
			// @TODO: Parse Date as medium
			return value;
		case PKDateStyle.Long:
			// @TODO: Parse Date as long
			return value;
		case PKDateStyle.Full:
			// @TODO: Parse Date as full
			return value;
		default:
			return value;
	}
}

export const FieldSet = withRegistration(withFallback(PureFieldSet, ["value", "fieldKey"]), FieldKind.FIELDS);
export const FieldLabel = withRegistration(withFallback(PureFieldLabel, ["label", "fieldKey"]), FieldKind.FIELDS);
export const FieldValue = withRegistration(withFallback(PureFieldValue, ["value", "fieldKey"]), FieldKind.FIELDS);

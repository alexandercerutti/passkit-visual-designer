import * as React from "react";
import { PKDateStyle } from "../../../constants";
import { composeLabelValueStylesFromProps, FieldProperties, FieldTypes } from "./fieldCommons";
import { SelectableComponent } from "../../useRegistrations";

type ValueProps = FieldProperties<FieldTypes.VALUE> & Partial<SelectableComponent<never>>;

/**
 * @TODO use svg text to allow it to resize manually
 */

export default function PureFieldValue(props: ValueProps) {
	const style = composeLabelValueStylesFromProps(props, "label");

	const parsedValue = getValueFromProps(props);
	console.log("PureFieldValue ", props)

	return (
		<span
			className="value"
			style={style}
			onClick={props.onClick}
		>
			{parsedValue}
		</span>
	);
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

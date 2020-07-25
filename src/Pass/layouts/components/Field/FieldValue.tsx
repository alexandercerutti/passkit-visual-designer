import * as React from "react";
import { PKDateStyle } from "../../../constants";
import { composeLabelValueStylesFromProps, FieldProperties, FieldTypes } from "./fieldCommons";
import { SelectableComponent } from "../../sections/useRegistrations";

type ValueProps = Partial<SelectableComponent<never>> & {
	fieldData: Partial<FieldProperties<FieldTypes.VALUE>>
};

/**
 * @TODO use svg text to allow it to resize manually
 */

export default function FieldValue(props: ValueProps) {
	const { fieldData } = props;
	const style = composeLabelValueStylesFromProps(fieldData, "label");
	const parsedValue = getValueFromProps(props);

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
	const { fieldData: { value, dateStyle, timeStyle } } = props;
	const valueAsDate = new Date(value);

	const shouldShowDate = (
		dateStyle !== undefined &&
		dateStyle !== PKDateStyle.None
	);
	const shouldShowTime = (
		timeStyle !== undefined &&
		timeStyle !== PKDateStyle.None
	);

	if (isNaN(valueAsDate.getTime()) || !(shouldShowTime && shouldShowDate)) {
		/**
		 * Date parsing failed ("Invalid date").
		 * Or it doesn't have to be parsed as date
		 * We are returning directly the value
		 * without performing any kind of parsing.
		 */
		return value;
	}

	const timeValues = [];

	if (shouldShowDate) {
		timeValues.push(getDateValueFromDateStyle(dateStyle, value));
	}

	if (shouldShowTime) {
		timeValues.push(getTimeValueFromTimeStyle(timeStyle, value));
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

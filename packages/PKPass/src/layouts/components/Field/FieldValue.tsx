import * as React from "react";
import { Pass } from "@pkvd/passkit-types";
import { getCSSFromFieldProps, FieldProperties, FieldTypes } from "./fieldCommons";
import { SelectableComponent } from "../../sections/useFieldRegistration";
import format from "date-fns/format";

type ValueProps = Partial<SelectableComponent<never>> & {
	fieldData: Partial<FieldProperties<FieldTypes.VALUE>>;
};

/**
 * @TODO use svg text to allow it to resize manually?
 */

export default function FieldValue(props: ValueProps) {
	const { fieldData } = props;
	const style = getCSSFromFieldProps(fieldData, "label");
	const parsedValue = getValueFromProps(props);

	return (
		<span className="value" style={style} onClick={props.onClick}>
			{parsedValue}
		</span>
	);
}

function getValueFromProps(props: ValueProps) {
	const {
		fieldData: { value, dateStyle, timeStyle },
	} = props;
	const valueAsDate = new Date(value);

	const shouldShowDate = dateStyle !== undefined && dateStyle !== Pass.PKDateStyle.None;
	const shouldShowTime = timeStyle !== undefined && timeStyle !== Pass.PKDateStyle.None;

	if (isNaN(valueAsDate.getTime()) || (!shouldShowTime && !shouldShowDate)) {
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
		timeValues.push(getDateValueFromDateStyle(dateStyle, valueAsDate));
	}

	if (shouldShowTime) {
		timeValues.push(getTimeValueFromTimeStyle(timeStyle, valueAsDate));
	}

	return timeValues.join(" ");
}

function getDateValueFromDateStyle(dateStyle: Pass.PKDateStyle, value: Date) {
	switch (dateStyle) {
		case Pass.PKDateStyle.Short:
			return format(value, "P");
		case Pass.PKDateStyle.Medium:
			return format(value, "MMM dd, yyyy");
		case Pass.PKDateStyle.Long:
			return format(value, "MMMM dd, yyyy");
		case Pass.PKDateStyle.Full:
			return format(value, "PPPP G");
		default:
			return value;
	}
}

function getTimeValueFromTimeStyle(timeStyle: Pass.PKDateStyle, value: Date) {
	switch (timeStyle) {
		case Pass.PKDateStyle.Short:
			return format(value, "p");
		case Pass.PKDateStyle.Medium:
			return format(value, "pp");
		case Pass.PKDateStyle.Long:
			// @TODO Timezone format (PST, GMT) should be added here
			return format(value, "h:mm:ss a");
		case Pass.PKDateStyle.Full:
			// @TODO Timezone format (PST, GMT) as extended string should be added here
			return format(value, "h:mm:ss a OOOO");
		default:
			return value;
	}
}

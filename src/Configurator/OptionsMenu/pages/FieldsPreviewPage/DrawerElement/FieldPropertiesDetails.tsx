import { PKDataDetectorType, PKTextAlignment, PKDateStyle } from "../../../../../passes/constants";

type FieldPropertyDetail = {
	name: string,
	type: typeof String | typeof Boolean | typeof PKTextAlignment | typeof PKDateStyle | typeof PKDataDetectorType,
	placeholder?: string;
	optional?: boolean;
	defaultValue?: string;
};

export const FieldPropertiesDetails: FieldPropertyDetail[] = [
	{
		name: "value",
		type: String,
		optional: false,
	},
	{
		name: "label",
		type: String,
		optional: true,
	},
	{
		name: "attributedValue",
		type: String,
		placeholder: "<a href='http://example.com/customers/123'>Edit my profile</a>",
		optional: true,
	},
	{
		name: "changeMessage",
		type: String,
		placeholder: "Gate changed to %@",
		optional: true,
	},
	{
		name: "dataDetectorTypes",
		type: PKDataDetectorType,
		optional: true,
		defaultValue: "None"
	},
	{
		name: "textAlignment",
		type: PKTextAlignment,
		optional: true,
		defaultValue: PKTextAlignment.Natural,
	},
	{
		name: "dateStyle",
		type: PKDateStyle,
		optional: true,
		defaultValue: PKDateStyle.None
	},
	{
		name: "timeStyle",
		type: PKDateStyle,
		optional: true,
		defaultValue: PKDateStyle.None
	},
	{
		name: "ignoresTimeZone",
		type: Boolean,
		optional: true,
	},
	{
		name: "isRelative",
		type: Boolean,
		optional: true,
	}
];

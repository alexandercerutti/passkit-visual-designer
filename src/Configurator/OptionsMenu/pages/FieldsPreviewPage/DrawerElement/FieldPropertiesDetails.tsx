import { Pass } from "@pkvd/passkit-types";

type FieldPropertyDetail = {
	name: keyof Pass.PassFieldContent;
	type:
		| typeof String
		| typeof Boolean
		| typeof Pass.PKTextAlignment
		| typeof Pass.PKDateStyle
		| typeof Pass.PKDataDetectorType;
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
		type: Pass.PKDataDetectorType,
		optional: true,
		defaultValue: "None",
	},
	{
		name: "textAlignment",
		type: Pass.PKTextAlignment,
		optional: true,
		defaultValue: Pass.PKTextAlignment.Natural,
	},
	{
		name: "dateStyle",
		type: Pass.PKDateStyle,
		optional: true,
		defaultValue: Pass.PKDateStyle.None,
	},
	{
		name: "timeStyle",
		type: Pass.PKDateStyle,
		optional: true,
		defaultValue: Pass.PKDateStyle.None,
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
	},
];

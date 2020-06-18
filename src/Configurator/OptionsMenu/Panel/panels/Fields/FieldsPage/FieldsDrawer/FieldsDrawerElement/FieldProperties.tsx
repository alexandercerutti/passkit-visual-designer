import { PKDataDetectorType, PKTextAlignment, PKDateStyle } from "../../../../../../../../passes/constants";

type FieldPropStructure = { [key: string]: { type: typeof String | typeof Boolean | typeof PKTextAlignment | typeof PKDateStyle | typeof PKDataDetectorType } }

export interface AllFieldProperties {
	key: string;
	value: string;
	label: string;
	attributedValue: string;
	changeMessage: string;
	dataDetectorTypes: PKDataDetectorType;
	textAlignment: PKTextAlignment;
	dateStyle: PKDateStyle;
	timeStyle: PKDateStyle;
	ignoresTimeZone: boolean;
	isRelative: boolean;
}

export const OptionalFieldProperties: FieldPropStructure = {
	"label": {
		type: String,
	},
	"attributedValue": {
		type: String,
	},
	"changeMessage": {
		type: String,
	},
	"dataDetectorTypes": {
		type: PKDataDetectorType,
	},
	"textAlignment": {
		type: PKTextAlignment,
	},
	"dateStyle": {
		type: PKDateStyle,
	},
	"timeStyle": {
		type: PKDateStyle,
	},
	"ignoresTimeZone": {
		type: Boolean,
	},
	"isRelative": {
		type: Boolean,
	}
};

export const AllFieldProperties: FieldPropStructure = {
	...OptionalFieldProperties,
	"key": {
		type: String
	},
	"value": {
		type: String
	}
};

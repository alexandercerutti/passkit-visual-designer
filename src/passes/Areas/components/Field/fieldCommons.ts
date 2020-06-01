import { PKTextAlignment, PKDataDetectorType, PKDateStyle } from "../../../constants";
import { FieldProps } from ".";

export function composeLabelValueStylesFromProps(props: Partial<FieldProps>, origin: "label" | "value"): React.CSSProperties {
	const textAlignment = props.textAlignment || PKTextAlignment.Natural;

	return {
		textAlign: textAlignment,
		color: String(origin === "value" && props.textColor || props.labelColor) || "#000",
		overflow: "hidden",
		textOverflow: "ellipsis",
	}
}

type LabelSpecificProps = {
	labelColor?: string;
	label?: string;
};

type ValueSpecificProps = {
	value: any;
	textColor?: string;
}

export const enum FieldTypes {
	LABEL,
	VALUE,
	BOTH
}

export type FieldProperties<T extends FieldTypes = FieldTypes.BOTH> = {
	className?: string;
	style?: React.CSSProperties;
	fieldKey: string;

	// to be implemented
	textAlignment?: PKTextAlignment;
	dataDetectorTypes?: PKDataDetectorType;
	changeMessage?: string; // check for @s
	dateStyle?: PKDateStyle;
	timeStyle?: PKDateStyle;
} & (
		T extends FieldTypes.LABEL ? LabelSpecificProps :
		T extends FieldTypes.VALUE ? ValueSpecificProps :
		T extends FieldTypes.BOTH ? LabelSpecificProps & ValueSpecificProps : never
	);

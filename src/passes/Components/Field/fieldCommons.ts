import { PKTextAlignment, PKDataDetectorType, PKDateStyle } from "../../constants";
import { FieldProps } from ".";
import { RegistrableComponent } from "../withRegistration";

export function composeLabelValueStylesFromProps(props: Partial<FieldProps>, origin: "label" | "value"): React.CSSProperties {
	const textAlignment = props.textAlignment || PKTextAlignment.Natural;

	return {
		textAlign: textAlignment,
		color: String(origin === "value" && props.textColor || props.labelColor) || "#000",
		overflow: "hidden",
		textOverflow: "ellipsis",
	}
}

export interface FieldProperties extends RegistrableComponent {
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

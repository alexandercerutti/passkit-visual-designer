import { PKTextAlignment, PassFieldKeys } from "../../../constants";
import { StylingProps } from "../../../../model";

export function composeLabelValueStylesFromProps(props: Partial<FieldProperties>, origin: "label" | "value"): React.CSSProperties {
	const textAlignment = props.textAlignment || PKTextAlignment.Natural;

	return {
		textAlign: transformPKTextAlignmentToCSS(textAlignment),
		color: String(origin === "value" && props.textColor || props.labelColor) || "#000",
		overflow: "hidden",
		textOverflow: "ellipsis",
	}
}

function transformPKTextAlignmentToCSS(textAlignment: PKTextAlignment) {
	switch (textAlignment) {
		case PKTextAlignment.Left:
			return "left";
		case PKTextAlignment.Center:
			return "center";
		case PKTextAlignment.Right:
			return "right";
		case PKTextAlignment.Natural:
			return "start";
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

export type FieldProperties<T extends FieldTypes = FieldTypes.BOTH> =
	Omit<PassFieldKeys, "value" | "label"> &
	StylingProps & (
		T extends FieldTypes.LABEL ? LabelSpecificProps :
		T extends FieldTypes.VALUE ? ValueSpecificProps :
		T extends FieldTypes.BOTH ? LabelSpecificProps & ValueSpecificProps : never
	);

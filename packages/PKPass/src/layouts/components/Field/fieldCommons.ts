import { Pass } from "@pkvd/passkit-types";
import { StylingProps } from "../../../../../../src/model";

export function getCSSFromFieldProps(
	props: Partial<FieldProperties>,
	origin: "label" | "value"
): React.CSSProperties {
	const textAlignment = props.textAlignment || Pass.PKTextAlignment.Natural;

	return {
		textAlign: transformPKTextAlignmentToCSS(textAlignment),
		color: String((origin === "value" && props.textColor) || props.labelColor) || "#000",
		overflow: "hidden",
		textOverflow: "ellipsis",
	};
}

function transformPKTextAlignmentToCSS(textAlignment: Pass.PKTextAlignment) {
	switch (textAlignment) {
		case Pass.PKTextAlignment.Left:
			return "left";
		case Pass.PKTextAlignment.Center:
			return "center";
		case Pass.PKTextAlignment.Right:
			return "right";
		case Pass.PKTextAlignment.Natural:
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
};

export const enum FieldTypes {
	LABEL,
	VALUE,
	BOTH,
}

export type FieldProperties<T extends FieldTypes = FieldTypes.BOTH> = Omit<
	Pass.PassFieldContent,
	"value" | "label"
> &
	StylingProps &
	(T extends FieldTypes.LABEL
		? LabelSpecificProps
		: T extends FieldTypes.VALUE
		? ValueSpecificProps
		: T extends FieldTypes.BOTH
		? LabelSpecificProps & ValueSpecificProps
		: never);

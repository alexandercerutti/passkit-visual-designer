import * as React from "react";
import { FillableComponent } from "../FillableComponent";
import withRegistration from "../withRegistration";
import withFallback from "../EmptyField/withFallback";
import { FieldKind } from "../../../model";
import "./fields.less";
import { PKTextAlignment, PKDataDetectorType, PKDateStyle } from "../../constants";

export interface FieldSetProps extends FillableComponent {
	className?: string;
	labelColor?: string;
	textColor?: string;
	fieldKey: string;
	label?: string;
	value: string;

	// to be implemented
	textAlignment: PKTextAlignment;
	dataDetectorTypes: PKDataDetectorType;
	changeMessage?: string; // check for @s
	dateStyle?: PKDateStyle;
	timeStyle?: PKDateStyle;
}

function PureFieldSet(props: FieldSetProps) {
	return (
		<div className={`${props.className || ""} field field-${props.fieldKey}`.trim()}>
			{
				props.label &&
				<span style={{ color: props.labelColor || "#000" }}>
					{props.label}
				</span>
			}
			<span style={{ color: props.textColor || "#000" }}>
				{props.value}
			</span>
		</div>
	);
}

export default withRegistration(withFallback(PureFieldSet, ["value", "fieldKey"]), FieldKind.FIELDS);

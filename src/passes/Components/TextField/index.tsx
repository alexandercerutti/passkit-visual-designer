import * as React from "react";
import "./textField.less";
import { FillableComponent } from "../FillableComponent";
import withRegistration from "../withRegistration";
import { FieldKind } from "../../../model";
import withFallback from "../EmptyField/withFallback";

interface TextProps extends FillableComponent<string> {
	className?: string;
}

function PureTextField(props: TextProps) {
	return (
		<div className={`${props.className || ""} text-field`.trim()}>
			{props.content}
		</div>
	);
}

export default withRegistration(withFallback(PureTextField, "content"), FieldKind.TEXT);

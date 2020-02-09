import * as React from "react";
import "./style.less";
import withRegistration, { RegistrableComponent } from "../withRegistration";
import { FieldKind } from "../../../model";
import withFallback from "../EmptyField/withFallback";

export interface TextFieldProps extends RegistrableComponent {
	content?: string;
	className?: string;
}

function PureTextField(props: TextFieldProps) {
	return (
		<div className={`${props.className || ""} text-field`.trim()}>
			{props.content}
		</div>
	);
}

export default withRegistration(withFallback(PureTextField, ["content"]), FieldKind.TEXT);

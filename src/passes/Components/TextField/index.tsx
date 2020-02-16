import * as React from "react";
import "./style.less";
import withRegistration, { RegistrableComponent } from "../withRegistration";
import { FieldKind } from "../../../model";
import withFallback from "../EmptyField/withFallback";
import { concatClassNames } from "../../utils";

export interface TextFieldProps extends RegistrableComponent {
	content?: string;
	className?: string;
}

function PureTextField(props: TextFieldProps) {
	const className = concatClassNames("text-field", props.className);

	return (
		<div className={className}>
			{props.content}
		</div>
	);
}

export default withRegistration(withFallback(PureTextField, ["content"]), FieldKind.TEXT);

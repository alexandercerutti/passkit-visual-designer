import * as React from "react";
import "./style.less";
import withRegistration, { RegistrableComponent } from "../withRegistration";
import { FieldKind } from "../../../model";
import { concatClassNames } from "../../utils";
import useFallback from "../EmptyField/useFallback";

export interface TextFieldProps extends RegistrableComponent {
	content?: string;
	className?: string;
}

function PureTextField(props: TextFieldProps) {
	const { content, className: sourceClassName } = props;

	return useFallback(() => {
		const className = concatClassNames("text-field", sourceClassName);

		return (
			<div className={className}>
				{content}
			</div>
		);
	}, [content]);
}

export default withRegistration(PureTextField, FieldKind.TEXT);

import * as React from "react";
import "./style.less";
import useRegistration, { RegistrableComponent } from "../useRegistration";
import { FieldKind } from "../../../../model";
import { concatClassNames } from "../../../utils";
import useFallback from "../EmptyField/useFallback";

export interface TextFieldProps extends RegistrableComponent {
	content?: string;
	className?: string;
}

export default function TextField(props: TextFieldProps) {
	const { id, register, content, className: sourceClassName } = props;

	useRegistration(register, FieldKind.TEXT, id);

	return useFallback(() => {
		const className = concatClassNames("text-field", sourceClassName);

		return (
			<div className={className}>
				{content}
			</div>
		);
	}, [content]);
}

import * as React from "react";
import "./style.less";
import { RegisteredComponent } from "../../useRegistrations";
import { concatClassNames } from "../../../utils";
import useFallback from "../useFallback";

export interface TextFieldProps extends Partial<RegisteredComponent> {
	content?: string;
	className?: string;
}

export default function TextField(props: TextFieldProps) {
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

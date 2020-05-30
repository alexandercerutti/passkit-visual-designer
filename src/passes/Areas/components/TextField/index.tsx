import * as React from "react";
import "./style.less";
import { SelectableComponent } from "../../useRegistrations";
import { concatClassNames } from "../../../utils";
import useFallback from "../useFallback";
import useClickEvent from "../useClickEvent";

export interface TextFieldProps extends Partial<SelectableComponent> {
	content?: string;
	className?: string;
}

export default function TextField(props: TextFieldProps) {
	const { content, className: sourceClassName, onClick } = props;

	return useClickEvent(onClick, useFallback(() => {
		const className = concatClassNames("text-field", sourceClassName);

		return (
			<div className={className}>
				{content}
			</div>
		);
	}, [content]));
}

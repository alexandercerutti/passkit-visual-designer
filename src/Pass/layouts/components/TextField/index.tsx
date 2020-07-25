import * as React from "react";
import "./style.less";
import { SelectableComponent } from "../../sections/useRegistrations";
import { createClassName } from "../../../../utils";
import useFallback from "../useFallback";
import useClickEvent from "../useClickEvent";

export interface TextFieldProps extends Partial<SelectableComponent> {
	content?: string;
	className?: string;
}

export default function TextField(props: TextFieldProps) {
	const { content, className: sourceClassName, onClick } = props;

	return useClickEvent(onClick, useFallback(() => {
		const className = createClassName(["text-field", sourceClassName]);

		return (
			<div className={className}>
				{content}
			</div>
		);
	}, [content]));
}

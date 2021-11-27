import * as React from "react";
import "./style.less";
import { SelectableComponent } from "../../sections/useFieldRegistration";
import { createClassName } from "../../../utils";
import useFallbackField from "../useFallbackField";
import useClickEvent from "../useClickEvent";

export interface TextFieldProps extends Partial<SelectableComponent> {
	content?: string;
	className?: string;
}

export default function TextField(props: TextFieldProps) {
	const { content, className: sourceClassName, onClick } = props;

	return useClickEvent(
		onClick,
		useFallbackField(() => {
			const className = createClassName(["text-field", sourceClassName]);

			return (
				<div className={className}>
					<span>{content}</span>
				</div>
			);
		}, [content])
	);
}

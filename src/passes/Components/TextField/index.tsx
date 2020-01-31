import * as React from "react";
import "./textField.less";
import { FillableComponent } from "../FillableComponent";

interface TextProps extends FillableComponent<string> {
	className?: string;
}

export default function TextField(props: TextProps) {
	return (
		<div
			className={`${props.className || ""} text-field`.trim()}
			onClick={(e) => this.props.onSelect && this.props.onSelect(this.props.id)}
		>
			{props.content || ""}
		</div>
	);
}

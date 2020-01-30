import * as React from "react";
import "./textField.less";

interface TextProps {
	id: string;
	content?: string;
	className?: string;

	onSelect?(id: string): void;
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

import * as React from "react";

interface Props {
	name: string;
	value?: string | number;
	placeholder?: string;
	onValueChange<T>(prop: string, value: T): void;
}

export default function FieldStringPropertyPanel(props: Props) {
	return (
		<div className="fieldprop-string-panel">
			<label htmlFor={props.name}>{props.name}</label>
			<input
				id={props.name}
				type="text"
				value={props.value || ""}
				placeholder={props.placeholder}
				onChange={(ev) => props.onValueChange(props.name, ev.currentTarget.value)}
			/>
		</div>
	);
}

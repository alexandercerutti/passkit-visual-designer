import * as React from "react";

interface Props {
	name: string;
	value?: string;
	onValueChange<T>(value: T): void;
}

export default function FieldStringPropertyPanel(props: Props) {
	return (
		<div className="fieldprop-string-panel">
			<label htmlFor={props.name}>{props.name}</label>
			<input
				id={props.name}
				type="text"
				value={props.value}
				onChange={(ev) => props.onValueChange(ev.currentTarget.value)}
			/>
		</div>
	);
}

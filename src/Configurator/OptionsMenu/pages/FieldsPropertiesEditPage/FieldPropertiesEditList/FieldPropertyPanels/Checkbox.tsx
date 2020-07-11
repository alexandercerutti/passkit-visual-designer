import * as React from "react";

interface Props {
	name: string;
	value?: boolean;
	onValueChange<T>(prop: string, value: T): void;
}

export default function FieldCheckboxPropertyPanel(props: Props) {
	return (
		<div className="fieldprop-checkbox-panel">
			<label htmlFor={props.name}>{props.name}</label>
			<input
				checked={props.value ?? false}
				id={props.name}
				type="checkbox"
				onChange={(ev) => props.onValueChange(props.name, ev.currentTarget.checked)}
			/>
		</div>
	);
}

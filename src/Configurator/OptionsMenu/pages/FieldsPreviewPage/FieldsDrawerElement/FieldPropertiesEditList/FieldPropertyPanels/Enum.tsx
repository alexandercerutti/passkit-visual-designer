import * as React from "react";

interface Props<E> {
	name: string;
	value?: keyof E;
	options: E;
	onValueChange<T>(value: T): void;
}

export default function FieldEnumPropertyPanel<T>(props: Props<T>) {
	const options = Object.keys(props.options).map(key => (
		<option key={key} value={props.options[key]}>{key}</option>
	));

	return (
		<div className="fieldprop-enum-panel">
			<label htmlFor={props.name}>{props.name}</label>
			<select id={props.name}>
				{options}
			</select>
		</div>
	);
}

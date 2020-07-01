import * as React from "react";

interface Props<E> {
	name: string;
	value?: keyof E;
	options: E;
	defaultValue?: string;
	onValueChange<T>(prop: string, value: T): void;
}

export default function FieldEnumPropertyPanel<T>(props: Props<T>) {
	const [selectedValue, changeSelectedValue] = React.useState<string>(props.defaultValue || null);

	const isDefaultValueAnOption = Boolean(
		props.defaultValue &&
		Object.values(props.options).includes(props.defaultValue)
	);

	React.useEffect(() => {
		if (selectedValue) {
			props.onValueChange(props.name, selectedValue);
		}
	}, [selectedValue]);

	const options = [
		!isDefaultValueAnOption && (
			<option
				key={props.defaultValue}
				value={props.defaultValue}
			>
				{props.defaultValue}
			</option>
		) || null,
		...Object.keys(props.options).map(key => (
			<option
				key={key}
				value={props.options[key]}
			>
				{key}
			</option>
		))
	];

	return (
		<div className="fieldprop-enum-panel">
			<label htmlFor={props.name}>{props.name}</label>
			<select
				id={props.name}
				onChange={(e) => changeSelectedValue(e.currentTarget.selectedOptions[0].value)}
				value={selectedValue}
			>
				{options}
			</select>
		</div>
	);
}

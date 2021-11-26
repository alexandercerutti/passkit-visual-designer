import * as React from "react";

interface Props<E extends Object> {
	name: string;
	value?: string;
	options: E;
	defaultValue?: string;
	onValueChange<T>(prop: string, value: T): void;
}

export default function FieldEnumPropertyPanel<T>(props: Props<T>) {
	const [selectedValue, changeSelectedValue] = React.useState<string>(
		props.value || props.defaultValue || null
	);

	const isDefaultValueAnOption = Boolean(
		props.defaultValue && Object.values(props.options).includes(props.defaultValue)
	);

	React.useEffect(() => {
		if (selectedValue !== (props.value || props.defaultValue)) {
			props.onValueChange(props.name, selectedValue);
		}
	}, [selectedValue]);

	const options = [
		(!isDefaultValueAnOption && (
			<option key={props.defaultValue} value={props.defaultValue}>
				{props.defaultValue}
			</option>
		)) ||
			null,
		...Object.entries(props.options).map(([key, object]) => (
			<option key={key} value={object}>
				{key}
			</option>
		)),
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

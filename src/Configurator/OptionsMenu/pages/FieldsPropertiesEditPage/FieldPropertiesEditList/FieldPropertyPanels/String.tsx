import * as React from "react";
import CommittableTextInput from "../../../../../CommittableTextInput";

interface Props {
	name: string;
	value?: string | number;
	placeholder?: string;
	onValueChange<T>(prop: string, value: T): void;
}

export default function FieldStringPropertyPanel(props: Props) {
	const onCommit = React.useCallback((value: string) => {
		props.onValueChange(props.name, value);
	}, []);

	return (
		<div className="fieldprop-string-panel">
			<label htmlFor={props.name}>{props.name}</label>
			<CommittableTextInput
				id={props.name}
				defaultValue={props.value || ""}
				placeholder={props.placeholder}
				commit={onCommit}
			/>
		</div>
	);
}

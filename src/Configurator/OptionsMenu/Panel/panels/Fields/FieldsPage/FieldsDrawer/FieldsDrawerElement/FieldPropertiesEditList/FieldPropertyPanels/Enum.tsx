import * as React from "react";

interface Props<E> {
	name: string;
	value?: keyof E;
	options: E;
	onValueChange<T>(value: T): void;
}

export default function FieldEnumPropertyPanel<T>(props: Props<T>) {
	return (
		<div className="fieldprop-enum-panel">

		</div>
	);
}

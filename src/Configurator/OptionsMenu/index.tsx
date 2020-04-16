import * as React from "react";
import "./style.less";
import { FieldDetails } from "..";

interface OptionsMenuProps {
	selection?: string;
	registeredFields: Map<string, FieldDetails>;
	onValueChange(key: string, value: any): boolean;
}

export default function OptionsMenu(props: OptionsMenuProps) {
	return (
		<div></div>
	);
}

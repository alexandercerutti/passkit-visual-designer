import * as React from "react";
import "./style.less";

interface OptionsMenuProps {
	selection?: string;
	onValueChange(key: string, value: any): boolean;
}

export default function OptionsMenu(props: OptionsMenuProps) {
	return (
		<div></div>
	);
}

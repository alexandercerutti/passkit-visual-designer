import * as React from "react";
import "./style.less";
import MenuGroup from "./MenuGroup";
import { FieldDetails } from "..";

interface OptionsMenuProps {
	selection?: string;
	registeredFields: Map<string, FieldDetails>;
	onValueChange(key: string, value: any): boolean;
}

export default function OptionsMenu(props: OptionsMenuProps) {
	return (
		<div className="options-menu">
			<MenuGroup
				registeredFields={props.registeredFields}
			/>
		</div>
	);
}

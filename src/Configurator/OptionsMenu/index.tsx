import * as React from "react";
import "./style.less";
import PanelGroup from "./PanelGroup";
import { FieldDetails } from "./Panel";

interface OptionsMenuProps {
	selection?: string;
	registeredFields: Map<string, FieldDetails>;
	onValueChange(key: string, value: any): boolean;
}

export default function OptionsMenu(props: OptionsMenuProps) {
	return (
		<div className="options-menu">
			<PanelGroup
				registeredFields={props.registeredFields}
			/>
		</div>
	);
}

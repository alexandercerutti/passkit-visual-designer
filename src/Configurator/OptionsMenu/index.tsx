import * as React from "react";
import "./style.less";
import { FieldDetails } from "./Panel";
import PanelNavigator from "./PanelNavigator";
import OrganizedPanels from "./OrganizedPanels";

interface OptionsMenuProps {
	selection?: string;
	registeredFields: Map<string, FieldDetails>;
	onValueChange(key: string, value: any): boolean;
}

export default function OptionsMenu(props: OptionsMenuProps) {
	return (
		<div className="options-menu">
			<PanelNavigator>
				<OrganizedPanels registeredFields={props.registeredFields} />
			</PanelNavigator>
		</div>
	);
}

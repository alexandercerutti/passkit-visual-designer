import * as React from "react";
import "./style.less";
import { FieldDetails } from "./Panel";
import PanelNavigator from "./PanelNavigator";
import OrganizedPanels, { DataGroup } from "./OrganizedPanels";

export type RegisteredFieldsMap = Map<DataGroup, FieldDetails[]>;

interface OptionsMenuProps {
	selection?: string;
	registeredFields: RegisteredFieldsMap;
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

import * as React from "react";
import "./style.less";
import { FieldDetails } from "./Panel";
import PanelNavigator from "./PanelNavigator";
import { DataGroup } from "./pages/PanelsPage/PanelGroup";

export type RegisteredFieldsMap = Map<DataGroup, FieldDetails[]>;

interface OptionsMenuProps {
	selection?: string;
	registeredFields: RegisteredFieldsMap;
	onValueChange(key: string, value: any): boolean;
}

export default function OptionsMenu(props: OptionsMenuProps) {
	return (
		<div className="options-menu">
			<PanelNavigator fields={props.registeredFields} />
		</div>
	);
}

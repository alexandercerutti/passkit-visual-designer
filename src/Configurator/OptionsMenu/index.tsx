import * as React from "react";
import "./style.less";
import { FieldDetails } from "./pages/PanelsPage/Panel";
import PagesNavigator from "./PagesNavigator";
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
			<PagesNavigator fields={props.registeredFields} />
		</div>
	);
}

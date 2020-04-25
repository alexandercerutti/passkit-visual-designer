import * as React from "react";
import "./style.less";
import { FieldDetails } from "./Panel";
import PanelNavigator from "./PanelNavigator";

export enum DataGroup {
	METADATA = "Metadata",
	IMAGES = "Images",
	COLORS = "Colors",
	DATA = "Data"
}

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

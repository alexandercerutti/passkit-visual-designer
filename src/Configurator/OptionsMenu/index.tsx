import * as React from "react";
import "./style.less";
import { FieldDetails } from "./pages/PanelsPage/Panel";
import PagesNavigator from "./PagesNavigator";
import { DataGroup } from "./pages/PanelsPage/PanelGroup";
import { PassMixedProps } from "../../Pass";

export type RegisteredFieldsMap = Map<DataGroup, FieldDetails[]>;

interface OptionsMenuProps {
	selection?: string;
	registeredFields: RegisteredFieldsMap;
	data: PassMixedProps;
	onValueChange(key: string, value: any): Promise<boolean>;
}

export default function OptionsMenu(props: OptionsMenuProps) {
	return (
		<div className="options-menu">
			<PagesNavigator
				fields={props.registeredFields}
				onValueChange={props.onValueChange}
				data={props.data}
			/>
		</div>
	);
}

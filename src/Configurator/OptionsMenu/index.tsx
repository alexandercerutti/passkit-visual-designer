import * as React from "react";
import "./style.less";
import { FieldDetails } from "./pages/PanelsPage/Panel";
import PagesNavigator from "./PagesNavigator";
import { DataGroup } from "./pages/PanelsPage/PanelGroup";
import { PassMixedProps } from "../../Pass";

export type RegisteredFieldsMap = Map<DataGroup, FieldDetails[]>;

interface OptionsMenuProps {
	selection?: keyof PassMixedProps;
	registeredFields: RegisteredFieldsMap;
	data: PassMixedProps;
	onValueChange(key: string, value: any): Promise<boolean>;
	cancelFieldSelection(): void;
	requestExport(): void;
}

export default function OptionsMenu(props: OptionsMenuProps) {
	return (
		<div className="options-menu">
			<PagesNavigator
				selectedFieldID={props.selection}
				cancelFieldSelection={props.cancelFieldSelection}
				fields={props.registeredFields}
				onValueChange={props.onValueChange}
				data={props.data}
				requestExport={props.requestExport}
			/>
		</div>
	);
}

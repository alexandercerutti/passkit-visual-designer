import "./style.less";
import { FieldKind } from "../../../../../model";
import { DataGroup } from "..";

export { default as TextPanel } from "./TextPanel";
export { default as ColorPanel } from "./ColorPanel";
export { default as FieldsPanel } from "./FieldsPanel";
export { default as ImagePanel } from "./ImagePanel";

export interface SharedPanelProps {
	name: string;
	data: Omit<FieldDetails, "kind" | "name">;
	isSelected?: boolean;
	onValueChange?<T>(name: string, data: T): void;
}

export interface FieldDetails {
	name: string;
	kind: FieldKind;
	group: DataGroup;
	mockable?: boolean;
	tooltipText?: string;
	disabled?: boolean;
	required?: boolean;
	jsonKeys?: string[];
}

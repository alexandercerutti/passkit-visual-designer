import * as React from "react";
import { DataGroup } from "../OrganizedPanels";
import { FieldKind } from "../../../model";

export interface PanelProps {
	name: string;
	kind: FieldKind;
	data: Omit<FieldDetails, "kind">;
}

export interface FieldDetails {
	area: DataGroup;
	kind: FieldKind;
	mockable?: boolean;
	tooltipText?: string;
	disabled?: boolean;
	required?: boolean;
	jsonKeys?: string[];
}

export default function Panel(props: PanelProps) {
	// This will determine which kind of Panel render
	// based on the kind property
	return (
		<div></div>
	);
}

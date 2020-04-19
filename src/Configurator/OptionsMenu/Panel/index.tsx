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
	switch (props.kind) {

		// Each panel should use memoization to its non-targeted value
		// So if it is targeted, it gets rerendered.
		// This is needed only if it will change somehow, like... focus on text insertion?
		case FieldKind.TEXT:
			return (<div></div>)
		case FieldKind.COLOR:
			return (<div></div>)
		case FieldKind.FIELDS:
			return (<div></div>)
		case FieldKind.IMAGE:
			return (<div></div>)
		case FieldKind.JSON:
			return (<div></div>)
		case FieldKind.SWITCH:
			return (<div></div>)

		default:
			return null;
	}
}

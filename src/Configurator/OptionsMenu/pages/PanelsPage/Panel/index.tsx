import * as React from "react";
import "./style.less";
import { FieldKind } from "../../../../../model";
import TextPanel from "./TextPanel";
import ColorPanel from "./ColorPanel";
import FieldPanel from "./FieldsPanel";
import ImagePanel from "./ImagePanel";
import { PageNavigation } from "../../usePageFactory";
import { DataGroup } from "..";

export interface PanelProps extends PageNavigation {
	name: string;
	kind: FieldKind;
	data: Omit<FieldDetails, "kind" | "name">;
	value?: any; // will be overridden by single panels
	isSelected?: boolean;
	onValueChange<T>(name: string, data: T): void;
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

export default function Panel(props: PanelProps) {
	const Panel = resolvePanelKind(props);

	return (
		<div className={`panel ${props.kind}`} data-name={props.name}>
			<Panel {...props} />
		</div>
	);
}

function resolvePanelKind({ kind }: PanelProps): React.FunctionComponent<PanelProps> {
	switch (kind) {
		// Each panel should use memoization to its non-targeted value
		// So if it is targeted, it gets rerendered.
		// This is needed only if it will change somehow, like... focus on text insertion?
		case FieldKind.TEXT:
			return TextPanel;
		case FieldKind.COLOR:
			return ColorPanel;
		case FieldKind.FIELDS:
			return FieldPanel;
		case FieldKind.IMAGE:
			return ImagePanel;
		/* 		case FieldKind.JSON:
					return (<div></div>)
				case FieldKind.SWITCH:
					return (<div></div>) */

		default:
			return null;
	}
}

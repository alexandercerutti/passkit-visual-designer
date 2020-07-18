import * as React from "react";
import { FieldKind } from "../../../model";
import "./style.less";
import TextPanel from "./panels/Text";
import ColorPanel from "./panels/Color";
import FieldPanel from "./panels/Fields";
import ImagePanel from "./panels/Image";
import { PageNavigation } from "../pages/usePageFactory";

export interface PanelProps extends PageNavigation {
	name: string;
	kind: FieldKind;
	data: Omit<FieldDetails, "kind" | "name">;
	value?: any; // will be overridden by single panels
	onValueChange<T>(name: string, data: T): void;
}

export interface FieldDetails {
	name: string;
	kind: FieldKind;
	mockable?: boolean;
	tooltipText?: string;
	disabled?: boolean;
	required?: boolean;
	jsonKeys?: string[];
}

export default function Panel(props: PanelProps) {
	const Panel = switchPanelKind(props);

	return (
		<div className={`panel ${props.kind}`} data-name={props.name}>
			<Panel {...props} />
		</div>
	);
}

function switchPanelKind({ kind }: PanelProps): React.FunctionComponent<PanelProps> {
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

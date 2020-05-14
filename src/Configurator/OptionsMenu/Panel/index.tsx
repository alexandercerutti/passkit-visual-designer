import * as React from "react";
import { FieldKind } from "../../../model";
import TextPanel from "./panels/Text";
import ColorPanel from "./panels/Color";
import FieldPanel from "./panels/Fields";
import ImagePanel from "./panels/Image";

export interface PanelProps {
	name: string;
	kind: FieldKind;
	data: Omit<FieldDetails, "kind" | "name">;
	value?: any; // will be overridden by single panels
	requestPageCreation?(children: React.ReactNode): void;
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
	switch (props.kind) {

		// Each panel should use memoization to its non-targeted value
		// So if it is targeted, it gets rerendered.
		// This is needed only if it will change somehow, like... focus on text insertion?
		case FieldKind.TEXT:
			return <TextPanel {...props} />;
		case FieldKind.COLOR:
			return <ColorPanel {...props} />;
		case FieldKind.FIELDS:
			return <FieldPanel {...props} />;
		case FieldKind.IMAGE:
			return <ImagePanel {...props} />;
		/* 		case FieldKind.JSON:
					return (<div></div>)
				case FieldKind.SWITCH:
					return (<div></div>) */

		default:
			return null;
	}
}

import * as React from "react";
import "./style.less";
import { FieldDetails } from "../..";
import { FieldKind } from "../../../model";

interface GroupProps {
	name: string;
	registeredFields: Map<string, FieldDetails>;
}

export enum DataGroup {
	METADATA,
	IMAGES,
	COLORS,
	DATA
}

export default function PanelGroup(props: GroupProps) {
	const panels = Array.from(props.registeredFields.entries(), ([key, value]) => {
		switch (value.kind) {

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
	});

	return (
		<div className="menu-group">

		</div>
	);
}

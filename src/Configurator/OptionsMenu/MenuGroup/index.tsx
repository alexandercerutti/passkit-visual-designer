import * as React from "react";
import "./style.less";
import { FieldDetails } from "../..";
import { FieldKind } from "../../../model";

interface MenuProps {
	registeredFields: Map<string, FieldDetails>;
}

export enum DataGroup {
	METADATA,
	IMAGES,
	COLORS,
	DATA
}

export default function MenuGroup(props: MenuProps) {
	const panels = Array.from(props.registeredFields.entries(), ([key, value]) => {
		switch (value.kind) {
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

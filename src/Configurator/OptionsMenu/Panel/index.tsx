import * as React from "react";
import { DataGroup } from "../OrganizedPanels";
import { FieldKind } from "../../../model";

interface Props {
	name: string;
	kind: FieldKind;
	data: any;
}

export default function Panel(props: Props) {
	// This will determine which kind of Panel render
	// based on the kind property
	return (
		<div></div>
	);
}

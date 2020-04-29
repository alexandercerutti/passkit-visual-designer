import * as React from "react";
import { PanelProps } from "../..";
import "./style.less";

interface FieldPanelProps extends Omit<PanelProps, "kind"> { }

export default function FieldPanel(props: FieldPanelProps) {
	return (
		<div></div>
	);
}

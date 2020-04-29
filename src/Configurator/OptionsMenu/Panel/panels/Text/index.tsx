import * as React from "react";
import { PanelProps } from "../..";
import "./style.less";

interface TextPanelProps extends Omit<PanelProps, "kind"> { }

export default function TextPanel(props: TextPanelProps) {
	return (
		<div></div>
	);
}

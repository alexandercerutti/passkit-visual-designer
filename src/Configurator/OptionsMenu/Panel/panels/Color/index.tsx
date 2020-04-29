import * as React from "react";
import { PanelProps } from "../..";
import "./style.less";

interface ColorPanelProps extends Omit<PanelProps, "kind"> { }

export default function ColorPanel(props: ColorPanelProps) {
	return (
		<div></div>
	);
}

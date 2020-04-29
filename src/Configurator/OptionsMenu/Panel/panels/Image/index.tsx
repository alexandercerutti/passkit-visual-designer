import * as React from "react";
import { PanelProps } from "../..";
import "./style.less";

interface ImagePanelProps extends Omit<PanelProps, "kind"> { }

export default function ImagePanel(props: ImagePanelProps) {
	return (
		<div></div>
	);
}

import * as React from "react";
import { PanelProps } from "../..";
import "./style.less";

interface ImagePanelProps extends PanelProps {
	// value: ArrayBuffer;
}

export default function ImagePanel(props: ImagePanelProps) {
	const [picture, setPicture] = React.useState<Blob>(null);

	const showTitle = props.name.replace(/([a-z])([A-Z])/g, "$1 $2");

	return (
		<div className="panel image" data-name={props.name}>
			<h4>{showTitle}</h4>
			<div className="dd-area">
				<span>Icon</span>
			</div>
		</div>
	);
}

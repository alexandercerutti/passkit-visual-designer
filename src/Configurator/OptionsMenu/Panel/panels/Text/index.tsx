import * as React from "react";
import { PanelProps } from "../..";
import "./style.less";

interface TextPanelProps extends PanelProps { }

export default function TextPanel(props: TextPanelProps) {
	const showTitle = `${props.name.slice(0, 1).toUpperCase()}${props.name.slice(1)}`
		.replace(/([a-z])([A-Z])/g, "$1 $2");

	const required = (
		props.data.required &&
		<span className="required" />
	) || null;

	return (
		<div className="panel text" data-name={props.name}>
			<label htmlFor={props.name}><h4>{showTitle}</h4>{required}</label>
			<input id={props.name} placeholder={props.name} />
		</div>
	);
}

import * as React from "react";
import "./style.less";
import ArrowDownIcon from "./arrow";

interface GroupProps {
	name: string;
}

export default function PanelGroup(props: React.PropsWithChildren<GroupProps>) {
	return (
		<div className="menu-group" data-name={props.name}>
			<div className="intro">
				<h3>{props.name}</h3>
				<ArrowDownIcon style={{ width: "20px", fill: "#333" }} />
			</div>
			<div className="panels-list">
				{props.children}
			</div>
		</div>
	);
}

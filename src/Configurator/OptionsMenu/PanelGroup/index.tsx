import * as React from "react";
import "./style.less";
import { concatClassNames } from "../../../passes/utils";

interface GroupProps {
	name: string;
	icon: JSX.Element;
	isActive?: boolean;
	setActive?: (name: string) => void;
}

export default function PanelGroup(props: React.PropsWithChildren<GroupProps>) {
	const className = concatClassNames("menu-group", props.isActive && "open");

	const icon = React.cloneElement(props.icon, { className: "icon" });

	return (
		<div className={className} data-name={props.name}>
			<div className="intro" onClick={() => props.setActive(props.name)}>
				<h3>{props.name}</h3>
				{icon}
			</div>
			<div className="panels-list">
				<span>Here are your unstyled panels!</span>
				{props.children}
			</div>
		</div>
	);
}

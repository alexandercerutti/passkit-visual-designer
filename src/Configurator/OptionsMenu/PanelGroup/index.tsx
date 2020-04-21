import * as React from "react";
import "./style.less";
import ArrowDownIcon from "./arrow";
import { concatClassNames } from "../../../passes/utils";

interface GroupProps {
	name: string;
	isActive?: boolean;
	setActive?: (name: string) => void;
}

export default function PanelGroup(props: React.PropsWithChildren<GroupProps>) {
	const className = concatClassNames("menu-group", props.isActive && "open");

	return (
		<div className={className} data-name={props.name}>
			<div className="intro" onClick={() => props.setActive(props.name)}>
				<h3>{props.name}</h3>
				<ArrowDownIcon className="arrow-icon" />
			</div>
			<div className="panels-list">
				<span>Here are your unstyled panels!</span>
				{props.children}
			</div>
		</div>
	);
}

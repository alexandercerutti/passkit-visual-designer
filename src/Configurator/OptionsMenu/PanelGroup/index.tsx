import * as React from "react";
import "./style.less";

interface GroupProps {
	name: string;
}

export default function PanelGroup(props: React.PropsWithChildren<GroupProps>) {
	return (
		<div className="menu-group">
			{props.children}
		</div>
	);
}

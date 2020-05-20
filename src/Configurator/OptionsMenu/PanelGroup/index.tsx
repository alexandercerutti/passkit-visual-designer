import * as React from "react";
import "./style.less";
import { concatClassNames } from "../../../passes/utils";
import { TagIcon, ColorIcon, ImagesIcon, DataIcon } from "./icons";

export enum DataGroup {
	METADATA = "Metadata",
	IMAGES = "Images",
	COLORS = "Colors",
	DATA = "Data"
}

const DataGroupIcons = new Map<DataGroup, React.FC<React.SVGProps<SVGSVGElement>>>([
	[DataGroup.METADATA, TagIcon],
	[DataGroup.COLORS, ColorIcon],
	[DataGroup.IMAGES, ImagesIcon],
	[DataGroup.DATA, DataIcon]
]);

interface GroupProps {
	group: DataGroup;
	isActive?: boolean;
	setActive?: (name: string) => void;
}

export default function PanelGroup(props: React.PropsWithChildren<GroupProps>) {
	const className = concatClassNames("menu-group", props.isActive && "open");
	const Icon = DataGroupIcons.get(props.group);

	return (
		<div className={className} data-name={props.group}>
			<div className="intro" onClick={() => props.setActive(props.group)}>
				<h3>{props.group}</h3>
				<Icon className="icon" />
			</div>
			<div className="panels-list">
				{props.children}
			</div>
		</div>
	);
}

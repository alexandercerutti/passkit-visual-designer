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

export default function PanelGroup({ group, isActive, setActive, children }: React.PropsWithChildren<GroupProps>) {
	const className = concatClassNames("menu-group", isActive && "open");
	const Icon = DataGroupIcons.get(group);

	return (
		<div className={className} data-name={group}>
			<div className="intro" onClick={() => setActive(group)}>
				<h3>{group}</h3>
				<Icon className="icon" />
			</div>
			<div className="panels-list">
				{children}
			</div>
		</div>
	);
}

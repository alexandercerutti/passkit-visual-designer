import * as React from "react";
import Panel, { FieldDetails, PanelProps } from "./Panel";
import PanelGroup from "./PanelGroup";

interface Props {
	registeredFields: Map<string, FieldDetails>;
}

export enum DataGroup {
	METADATA = "Metadata",
	IMAGES = "Images",
	COLORS = "Colors",
	DATA = "Data"
}

/**
 * Performs the conversion from registeredFields to React Components and
 * organizes them for Panel Groups
 *
 * @param props
 */

export default function OrganizedPanels(props: Props) {
	const allPanels = Array.from(props.registeredFields.entries(), ([name, data]) => {
		const { kind, ...otherData } = data;
		return (
			<Panel
				name={name}
				kind={kind}
				data={otherData}
				key={name}
			/>
		);
	});

	const organizedPanels = allPanels.reduce((acc, current: React.ReactElement<PanelProps>) => {
		const { kind } = current.props;
		acc[kind] = [...(acc[kind] || []), current];
		return acc;
	}, {});

	const groups = Object.keys(organizedPanels).map(groupName => (
		<PanelGroup name={groupName}>
			{organizedPanels[groupName]}
		</PanelGroup>
	));

	return (
		<>{groups}</>
	);
}

import * as React from "react";
import Panel from "./Panel";
import PanelGroup from "./PanelGroup";
import { RegisteredFieldsMap } from ".";

interface Props {
	registeredFields: RegisteredFieldsMap;
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

export default React.memo(function OrganizedPanels(props: Props) {
	const groups = Array.from(props.registeredFields.entries(), ([group, details]) => {
		return (
			<PanelGroup name={group} key={group}>
				{details.map((data => {
					const { kind, name, ...otherData } = data;
					return (
						<Panel
							name={name}
							kind={kind}
							data={otherData}
							key={name}
						/>
					);
				}))}
			</PanelGroup>
		);
	});

	return (
		<>{groups}</>
	);
});

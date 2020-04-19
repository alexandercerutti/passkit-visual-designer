import * as React from "react";
import { FieldDetails } from "..";
import Panel from "./Panel";

interface Props {
	registeredPanels: Map<string, FieldDetails>;
}

export default function OrganizedPanels(props: Props) {
	const allPanels = Array.from(props.registeredPanels.entries(), ([name, data]) => {
		const { kind, ...otherData } = data;
		return (
			<Panel
				name={name}
				kind={kind}
				data={otherData}
			/>
		);
	});

	// TODO: Check for Panel kind prop and filter
	// for them for each DataGroup

	return (
		<div></div>
	);
}

import { PageNavigation } from "../usePageFactory";
import * as React from "react";
import PanelGroup, { DataGroup } from "./PanelGroup";
import Panel, { FieldDetails } from "../../Panel";
import { RegisteredFieldsMap } from "../..";
import PageNavigationContext from "../PageNavigationContext";

interface Props extends Partial<PageNavigation> {
	fields: RegisteredFieldsMap;
	onValueChange<T>(name: string, data: T): void;
}

export default function PanelsPage(props: Props) {
	const [activePanel, setActivePanel] = React.useState<DataGroup>(undefined);

	const exclusivePanelActivation = React.useRef((group: DataGroup) => {
		setActivePanel(currentActivePanel =>
			currentActivePanel !== group && group || null
		);
	});

	const groups = Array.from<[DataGroup, FieldDetails[]], JSX.Element>(props.fields.entries(), ([group, details]) => {
		return (
			<PanelGroup
				group={group}
				key={group}
				isActive={group === activePanel}
				setActive={exclusivePanelActivation.current}
			>
				<PageNavigationContext.Consumer>
					{(navProps) => (
						details.map((data => {
							const { kind, name, ...otherData } = data;
							return (
								<Panel
									key={name}
									name={name}
									kind={kind}
									data={otherData}
									onValueChange={props.onValueChange}
									{...navProps}
								/>
							);
						}))
					)}
				</PageNavigationContext.Consumer>
			</PanelGroup>
		);
	});

	return (
		<>
			{groups}
		</>
	);
}

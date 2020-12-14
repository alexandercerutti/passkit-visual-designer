import { PageNavigation } from "../usePageFactory";
import * as React from "react";
import PanelGroup, { DataGroup } from "./PanelGroup";
import Panel, { FieldDetails } from "./Panel";
import { RegisteredFieldsMap } from "../..";
import PageNavigationContext from "../PageNavigationContext";
import type { MediaProps, PassMixedProps } from "../../../../Pass";
import TabsList from "./TabsList";

interface Props extends Partial<PageNavigation> {
	selectedFieldID: keyof PassMixedProps;
	fields: RegisteredFieldsMap;
	data: PassMixedProps;
	onValueChange<T>(name: string, data: T): void;
	onMediaEditRequest(mediaName: keyof MediaProps): void;
}

export default function PanelsPage(props: Props) {
	const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
	const [activePanel, setActivePanel] = React.useState<DataGroup>(undefined);

	const exclusivePanelActivation = React.useRef((group: DataGroup) => {
		setActivePanel(currentActivePanel =>
			currentActivePanel !== group && group || null
		);
	});

	React.useEffect(() => {
		if (!props.selectedFieldID) {
			// We don't want to close data menu if we come back
			// from an auto-navigated page
			return;
		}

		const isDataActive = (
			props.fields
				.get(DataGroup.DATA)
				.map(entry => entry.name)
				.includes(props.selectedFieldID) &&
			DataGroup.DATA
		);

		setActivePanel(isDataActive);
	}, [props.selectedFieldID]);

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
									value={
										group === DataGroup.IMAGES
											? props.onMediaEditRequest
											: props.data?.[name]
									}
									onValueChange={props.onValueChange}
									isSelected={props.selectedFieldID === name}
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
			<TabsList
				menuVoices={["Metadata", "Images", "Colors", "Data"]}
				selectedIndex={selectedTabIndex}
				onSelect={setSelectedTabIndex}
			/>
			{groups}
		</>
	);
}

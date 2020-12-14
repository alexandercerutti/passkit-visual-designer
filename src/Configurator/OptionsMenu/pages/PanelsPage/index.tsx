import * as React from "react";
import "./style.less";
import { PageNavigation } from "../usePageFactory";
import Panel from "./Panel";
import { RegisteredFieldsMap } from "../..";
import PageNavigationContext from "../PageNavigationContext";
import type { MediaProps, PassMixedProps } from "../../../../Pass";
import TabsList from "./TabsList";

export enum DataGroup {
	METADATA = "Metadata",
	IMAGES = "Images",
	COLORS = "Colors",
	DATA = "Data"
}

const MenuVoices = [DataGroup.METADATA, DataGroup.IMAGES, DataGroup.COLORS, DataGroup.DATA];

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

	const context = React.useContext(PageNavigationContext);

	const panels = Array.from(props.fields.entries())
		.find(([group]) => group === MenuVoices[selectedTabIndex])[1]
		.map(({ kind, name, ...otherData }) => (
			<Panel
				key={name}
				name={name}
				kind={kind}
				data={otherData}
				value={
					MenuVoices[selectedTabIndex] === DataGroup.IMAGES
						? props.onMediaEditRequest
						: props.data?.[name]
				}
				onValueChange={props.onValueChange}
				isSelected={props.selectedFieldID === name}
				requestPageClosing={context.requestPageClosing}
				requestPageCreation={context.requestPageCreation}
			/>
		));

	return (
		<>
			<TabsList
				menuVoices={MenuVoices}
				selectedIndex={selectedTabIndex}
				onSelect={setSelectedTabIndex}
			/>
			<div className="list-element">
				<div className="panels-list">
					{panels}
				</div>
			</div>
		</>
	);
}

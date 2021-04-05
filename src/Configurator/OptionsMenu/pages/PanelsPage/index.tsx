import * as React from "react";
import "./style.less";
import { PageNavigation } from "../usePageFactory";
import Panel from "./Panel";
import { RegisteredFieldsMap } from "../..";
import PageNavigationContext from "../PageNavigationContext";
import type { PassMediaProps, PassMixedProps } from "@pkvd/pass";
import TabsList from "./TabsList";

export enum DataGroup {
	METADATA = "Metadata",
	IMAGES = "Images",
	COLORS = "Colors",
	DATA = "Data",
}

const MenuVoices = [DataGroup.METADATA, DataGroup.IMAGES, DataGroup.COLORS, DataGroup.DATA];

interface Props extends Partial<PageNavigation> {
	selectedFieldID: keyof PassMixedProps;
	fields: RegisteredFieldsMap;
	data: PassMixedProps;
	onValueChange<T>(name: string, data: T): void;
	onMediaEditRequest(mediaName: keyof PassMediaProps): void;
}

export default function PanelsPage(props: Props) {
	const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

	const onWheelEventHandler = React.useCallback((event: React.WheelEvent<HTMLDivElement>) => {
		const { scrollHeight, offsetHeight, scrollTop, parentElement } = event.currentTarget;

		if (scrollHeight - offsetHeight !== Math.floor(scrollTop)) {
			parentElement.classList.add("not-enough");
		} else {
			parentElement.classList.remove("not-enough");
		}
	}, []);

	React.useEffect(() => {
		if (!props.selectedFieldID) {
			return;
		}

		// Selecting Data
		setSelectedTabIndex(3);
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
				<div className="panels-list" onWheel={onWheelEventHandler}>
					{panels}
				</div>
			</div>
		</>
	);
}

import * as React from "react";
import "./style.less";
import { PageNavigation } from "../usePageFactory";
import Panel, { FieldDetails } from "./Panel";
import PageNavigationContext from "../PageNavigationContext";
import type { PassMediaProps, PassMixedProps } from "@pkvd/pass";
import TabsList from "./TabsList";
import RegistrationIndex from "src/Configurator/RegistrationIndex";

export enum DataGroup {
	METADATA = "Metadata",
	IMAGES = "Images",
	COLORS = "Colors",
	DATA = "Data",
}

const MenuVoices = [DataGroup.METADATA, DataGroup.IMAGES, DataGroup.COLORS, DataGroup.DATA];

interface Props extends Partial<PageNavigation> {
	selectedRegistrable: FieldDetails;
	fields: RegistrationIndex;
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
		if (!props.selectedRegistrable) {
			return;
		}

		const dgIndex = MenuVoices.findIndex((group) => group === props.selectedRegistrable.group);

		// Selecting Data
		setSelectedTabIndex(dgIndex);
	}, [props.selectedRegistrable]);

	const context = React.useContext(PageNavigationContext);

	const panels = props.fields
		.getDatagroup(MenuVoices[selectedTabIndex])
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
				isSelected={props.selectedRegistrable?.name === name}
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

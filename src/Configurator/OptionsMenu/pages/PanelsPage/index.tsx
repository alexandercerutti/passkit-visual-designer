import * as React from "react";
import "./style.less";
import { PageNavigation } from "../usePageFactory";
import Panel, { FieldDetails } from "./Panel";
import type { PassMediaProps, PassMixedProps } from "@pkvd/pass";
import TabsList from "./TabsList";
import RegistrationIndex from "../../../RegistrationIndex";
import { PageContainer } from "../../PageContainer";
import { createClassName } from "../../../../utils";
import { ShareIcon } from "./icons";

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
	requestExport?(): void;
}

export default function PanelsPage(props: Props) {
	const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
	const listRef = React.useRef<HTMLDivElement>(null);

	const determineOverflowBottomShadow = React.useCallback((element: HTMLDivElement) => {
		const { scrollHeight, offsetHeight, scrollTop, parentElement } = element;

		if (scrollHeight - offsetHeight !== Math.floor(scrollTop)) {
			parentElement.classList.add("not-enough");
		} else {
			parentElement.classList.remove("not-enough");
		}
	}, []);

	const onWheelEventHandler = React.useCallback((event: React.WheelEvent<HTMLDivElement>) => {
		determineOverflowBottomShadow(event.currentTarget);
	}, []);

	/** Shadow */
	React.useEffect(() => {
		determineOverflowBottomShadow(listRef.current);
	}, []);

	React.useEffect(() => {
		if (!props.selectedRegistrable) {
			return;
		}

		const dgIndex = MenuVoices.findIndex((group) => group === props.selectedRegistrable.group);

		// Selecting Data
		setSelectedTabIndex(dgIndex);
	}, [props.selectedRegistrable]);

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
			/>
		));

	const exportButtonClassName = createClassName(["export-btn"], {
		disabled: !props.requestExport,
	});

	return (
		<PageContainer>
			<TabsList
				menuVoices={MenuVoices}
				selectedIndex={selectedTabIndex}
				onSelect={setSelectedTabIndex}
			/>
			<div className="list-element">
				<div className="panels-list" onWheel={onWheelEventHandler} ref={listRef}>
					{panels}
				</div>
			</div>
			<div className={exportButtonClassName} onClick={() => props.requestExport?.()}>
				<h3>Export</h3>
				<ShareIcon className="icon" width="25px" height="25px" />
			</div>
		</PageContainer>
	);
}

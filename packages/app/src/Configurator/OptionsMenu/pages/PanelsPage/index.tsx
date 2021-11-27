import * as React from "react";
import "./style.less";
import { ColorPanel, FieldDetails, FieldsPanel, ImagePanel, TextPanel } from "./Panel";
import type { PassMediaProps, PassMixedProps } from "@pkvd/pkpass";
import { PKPassLayout } from "@pkvd/pkpass";
import TabsList from "./TabsList";
import RegistrationIndex from "../../../RegistrationIndex";
import { PageContainer } from "../../PageContainer";
import { createClassName } from "../../../../utils";
import { ShareIcon } from "./icons";
import { PageProps, usePageRelation } from "../../navigation.utils";
import FieldsPreviewPage from "../FieldsPreviewPage";

export enum DataGroup {
	METADATA = "Metadata",
	IMAGES = "Images",
	COLORS = "Colors",
	DATA = "Data",
}

const MenuVoices = [DataGroup.METADATA, DataGroup.IMAGES, DataGroup.COLORS, DataGroup.DATA];

interface Props extends Partial<PageProps> {
	selectedRegistrable: FieldDetails;
	fields: RegistrationIndex;
	data: PassMixedProps;
	onValueChange<T>(name: string, data: T): void;
	onMediaEditRequest(mediaName: keyof PassMediaProps): void;
	requestExport?(): void;
}

export default function PanelsPage(props: Props) {
	const [pageStatus, openPage, closePage, contexualProps] = usePageRelation<Partial<PageProps>>();
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
		closePage();

		if (!props.selectedRegistrable) {
			return;
		}

		const dgIndex = MenuVoices.findIndex((group) => group === props.selectedRegistrable.group);

		setSelectedTabIndex(dgIndex);

		if (props.selectedRegistrable.kind === PKPassLayout.FieldKind.FIELDS) {
			setTimeout(() => {
				openPage({ name: props.selectedRegistrable.name });
			}, 500);
		}
	}, [props.selectedRegistrable]);

	const panels = props.fields
		.getDatagroup(MenuVoices[selectedTabIndex])
		.map(({ kind, name, ...otherData }) => {
			const isSelected = props.selectedRegistrable?.name === name;

			switch (kind) {
				case PKPassLayout.FieldKind.TEXT: {
					return (
						<TextPanel
							key={name}
							name={name}
							data={otherData}
							value={props.data?.[name]}
							onValueChange={props.onValueChange}
							isSelected={isSelected}
						/>
					);
				}

				case PKPassLayout.FieldKind.IMAGE: {
					return (
						<ImagePanel
							key={name}
							name={name as keyof PassMediaProps}
							data={otherData}
							onSelect={props.onMediaEditRequest}
							isSelected={isSelected}
						/>
					);
				}

				case PKPassLayout.FieldKind.COLOR: {
					return (
						<ColorPanel
							key={name}
							name={name}
							data={otherData}
							value={props.data?.[name]}
							onValueChange={props.onValueChange}
							isSelected={isSelected}
						/>
					);
				}

				case PKPassLayout.FieldKind.FIELDS: {
					return (
						<FieldsPanel
							key={name}
							name={name}
							data={otherData}
							/** "name" is the name of property in pass.json */
							value={props.data?.[name]}
							onValueChange={props.onValueChange}
							onSelect={(name: string) => openPage({ name })}
						/>
					);
				}

				default: {
					return null;
				}
			}
		});

	const exportButtonClassName = createClassName(["export-btn"], {
		disabled: !props.requestExport,
	});

	return (
		<>
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
			{(pageStatus && <FieldsPreviewPage onBack={closePage} name={contexualProps.name} />) || null}
		</>
	);
}

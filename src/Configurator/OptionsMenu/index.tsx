import * as React from "react";
import "./style.less";
import { PassMediaProps, PassMixedProps } from "@pkvd/pass";
import PanelsPage from "./pages/PanelsPage";
import { FieldDetails } from "./pages/PanelsPage/Panel";
import type RegistrationIndex from "../RegistrationIndex";
import { usePageRelation, usePagesAmount } from "./navigation.utils";

interface Props {
	selectedRegistrable?: FieldDetails;
	fields: RegistrationIndex;
	data: PassMixedProps;
	cancelFieldSelection(): void;
	onValueChange(key: string, value: any): Promise<boolean>;
	requestExport(): void;
	onMediaEditRequest(mediaName: keyof PassMediaProps): void;
}

export default function OptionsMenu(props: Props) {
	const pagesAmount = usePagesAmount();
	const [, open] = usePageRelation();

	React.useLayoutEffect(() => {
		// Opening PanelsPage, which is always available
		open();
	}, []);

	return (
		<div id="pages-navigator" style={{ transform: `translate(-${pagesAmount * 100}%)` }}>
			<PanelsPage
				selectedRegistrable={props.selectedRegistrable}
				onValueChange={props.onValueChange}
				onMediaEditRequest={props.onMediaEditRequest}
				fields={props.fields}
				data={props.data}
				requestExport={props.requestExport}
			/>
		</div>
	);
}

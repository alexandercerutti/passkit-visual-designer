import * as React from "react";
import "./style.less";
import PageHeader from "../Header";
import { PageProps } from "../pages";
import FieldPreview from "../FieldPreview";
import { PassFieldKeys } from "../../../../passes/constants";
import FieldPropertiesEditList from "./FieldPropertiesEditList";

interface Props extends PageProps {
	data: PassFieldKeys;
	fieldUUID: string;
	onChange(props: PassFieldKeys): void;
}

export default function FieldsPropertiesEditPage(props: Props) {
	const [data, setData] = React.useState(props.data);

	React.useEffect(() => {
		if (data !== props.data) {
			props.onChange(data);
		}
	}, [data]);

	return (
		<div id="fields-properties-edit-page">
			<PageHeader />
			<FieldPreview
				keyEditable
				fieldUUID={props.fieldUUID}
				onFieldKeyChange={(fieldUUID: string, key: string) => setData({ ...data, key })}
				previewData={data}
			/>
			<FieldPropertiesEditList
				data={data}
				onValueChange={(prop, value) => {
					setData({
						...data,
						[prop]: value
					});
				}}
			/>
		</div>
	);
}

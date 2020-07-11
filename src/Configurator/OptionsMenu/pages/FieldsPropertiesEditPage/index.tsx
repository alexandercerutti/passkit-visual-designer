import * as React from "react";
import "./style.less";
import PageHeader from "../Header";
import { PageProps } from "../pages";
import FieldPreview from "../FieldsPreviewPage/FieldPreview";
import { FieldProps } from "../../../../passes/Areas/components/Field";
import FieldPropertiesEditList from "./FieldPropertiesEditList";

interface Props extends PageProps {
	data: FieldProps;
	fieldUUID: string;
	onChange(props: FieldProps): void;
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
				onFieldKeyChange={(fieldUUID: string, fieldKey: string) => setData({ ...data, fieldKey })}
				previewData={data}
			/>
			<FieldPropertiesEditList
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

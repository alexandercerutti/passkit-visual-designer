import * as React from "react";
import "./style.less";
import { Constants } from "@pkvd/pass";
import PageHeader from "../components/Header";
import { PageProps } from "../usePageFactory";
import FieldPreview from "../components/FieldPreview";
import FieldPropertiesEditList from "./FieldPropertiesEditList";
import { PageContainer } from "../../PageContainer";

type PassField = Constants.PassField;

interface Props extends PageProps {
	data: PassField;
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
		<PageContainer>
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
							[prop]: value,
						});
					}}
				/>
			</div>
		</PageContainer>
	);
}

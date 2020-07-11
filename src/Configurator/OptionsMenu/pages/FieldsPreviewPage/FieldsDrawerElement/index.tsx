import * as React from "react";
import "./style.less";
import FieldOptionsBar from "./FieldOptionsBar";
import FieldPreview from "../FieldPreview";
import { FieldProps } from "../../../../../passes/Areas/components/Field";
import FieldsPropertiesEditPage from "../../FieldsPropertiesEditPage";
import { PageNavigation } from "../../pages";
import usePageFactory from "../../usePageFactory";

interface FieldsDrawerElementProps extends Pick<PageNavigation, "requestPageCreation"> {
	fieldUUID: string;
	onFieldDelete(key: string): void;
	onFieldDataChange(fieldUUID: string, data: FieldProps): void;
	onFieldOrderChange(of: number): void;
	elementData: FieldProps;
	isUpperBoundary: boolean;
	isLowerBoundary: boolean;
}

export default function FieldsDrawerElement(props: FieldsDrawerElementProps) {
	const [fieldData, setFieldData] = React.useState(props.elementData);

	const pageCreationHandler = usePageFactory(
		FieldsPropertiesEditPage,
		{ data: fieldData, fieldUUID: props.fieldUUID },
		setFieldData
	);

	const onEditPropertiesHandler = React.useCallback(() => {
		pageCreationHandler(props.fieldUUID, props.requestPageCreation);
	}, [pageCreationHandler]);

	React.useEffect(() => {
		if (fieldData !== props.elementData) {
			props.onFieldDataChange(props.fieldUUID, fieldData);
		}
	}, [fieldData]);

	return (
		<div
			className="field-edit-item"
			data-key={fieldData.fieldKey || props.fieldUUID}
		>
			<FieldPreview
				fieldUUID={props.fieldUUID}
				previewData={fieldData}
				isFieldHidden={false}
				onClick={onEditPropertiesHandler}
			/>
			<FieldOptionsBar
				deleteField={props.onFieldDelete}
				requestFieldOrderChange={props.onFieldOrderChange}
				onPropsEditClick={onEditPropertiesHandler}
				fieldUUID={props.fieldUUID}
				isUpperBoundary={props.isUpperBoundary}
				isLowerBoundary={props.isLowerBoundary}
			/>
		</div>
	);
}

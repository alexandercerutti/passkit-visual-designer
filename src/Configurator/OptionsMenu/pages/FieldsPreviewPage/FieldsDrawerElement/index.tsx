import * as React from "react";
import "./style.less";
import FieldOptionsBar from "./FieldOptionsBar";
import FieldPreview from "../FieldPreview";
import { FieldProps } from "../../../../../passes/Areas/components/Field";
import FieldsPropertiesEditPage from "../../FieldsPropertiesEditPage";
import { PageNavigation } from "../../pages";
import usePageFactory from "../../usePageFactory";

interface FieldsDrawerElementProps extends Pick<PageNavigation, "requestPageCreation"> {
	onFieldDelete(key: string): void;
	onFieldOrderChange(of: number): void;
	elementData: FieldProps;
	isUpperBoundary: boolean;
	isLowerBoundary: boolean;
}

export default function FieldsDrawerElement(props: FieldsDrawerElementProps) {
	const [fieldData, setFieldData] = React.useState(props.elementData);

	const pageCreationHandler = usePageFactory(
		FieldsPropertiesEditPage,
		fieldData,
		setFieldData
	);

	const onEditPropertiesHandler = React.useCallback(() => {
		pageCreationHandler(fieldData.fieldKey, props.requestPageCreation);
	}, [fieldData]);

	return (
		<div
			className="field-edit-item"
			data-key={fieldData.fieldKey}
			key={fieldData.fieldKey}
		>
			<FieldPreview
				previewData={fieldData}
				isFieldHidden={false}
				onClick={onEditPropertiesHandler}
			/>
			<FieldOptionsBar
				deleteField={props.onFieldDelete}
				requestFieldOrderChange={props.onFieldOrderChange}
				onPropsEditClick={onEditPropertiesHandler}
				fieldKey={fieldData.fieldKey}
				isUpperBoundary={props.isUpperBoundary}
				isLowerBoundary={props.isLowerBoundary}
			/>
		</div>
	);
}

import * as React from "react";
import "./style.less";
import { Constants } from "@pkvd/pass";
import FieldOptionsBar from "./FieldOptionsBar";
import FieldPreview from "../../components/FieldPreview";

type PassField = Constants.PassField;

interface DrawerElementProps {
	onFieldDelete(key: string): void;
	onFieldOrderChange(fieldUUID: string, of: number): void;
	elementData: PassField;
	isUpperBoundary: boolean;
	isLowerBoundary: boolean;
	openDetailsPage(fieldUUID: string): void;
}

export default function DrawerElement(props: DrawerElementProps) {
	const onEditPropertiesHandler = React.useCallback(() => {
		props.openDetailsPage(props.elementData.fieldUUID);
	}, [props.elementData.fieldUUID]);

	return (
		<div
			className="field-edit-item"
			data-key={props.elementData?.key || props.elementData.fieldUUID}
		>
			<FieldPreview
				previewData={props.elementData}
				isFieldHidden={false}
				onClick={onEditPropertiesHandler}
			/>
			<FieldOptionsBar
				deleteField={props.onFieldDelete}
				requestFieldOrderChange={props.onFieldOrderChange}
				onPropsEditClick={onEditPropertiesHandler}
				fieldUUID={props.elementData.fieldUUID}
				isUpperBoundary={props.isUpperBoundary}
				isLowerBoundary={props.isLowerBoundary}
			/>
		</div>
	);
}

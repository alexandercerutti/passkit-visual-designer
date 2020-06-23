import * as React from "react";
import "./style.less";
import { FieldPanelProps } from "../../Panel/panels/Fields";
import { FieldProps } from "../../../../passes/Areas/components/Field";
import { FieldsAddIcon } from "./icons";
import Drawer from "./Drawer";
import FieldsDrawerPlaceholder from "./FieldDrawerPlaceholder";
import PageHeader from "../Header";
import { PageProps } from "../pages";

interface Props extends PageProps, Omit<FieldPanelProps, "requestPageClosing" | "requestPageCreation"> { }

export default function FieldsPreviewPage(props: Props) {
	const [fields, setFields] = React.useState(props.value || []);
	const name = `${props.name.slice(0, 1).toUpperCase()}${props.name.slice(1)}`;

	const onFieldDeleteHandler = (fieldKey: string) => {
		const fieldWithKeyIndex = fields.findIndex(f => f.fieldKey === fieldKey);
		const newFields = [...fields];
		newFields.splice(fieldWithKeyIndex, 1);
		setFields(newFields);
	};

	const onFieldAddHandler = () => {
		// Defining a custom initial fieldKey that, we hope,
		// shouldn't be used by anyone to identify their fields
		const fieldKey = `::pkvd-new-${fields.length + 1}$`;
		setFields([...fields, { fieldKey } as FieldProps]);
	}

	const onFieldOrderChange = (fromIndex: number, of: number): void => {
		// Creating a copy of the array and swapping two elements
		const nextFields = fields.slice(0);
		nextFields[fromIndex] = [
			nextFields[fromIndex + of],
			nextFields[fromIndex + of] = nextFields[fromIndex]
		][0];

		setFields(nextFields);
	}

	const fullPageElement = (
		fields.length &&
		<Drawer
			{...props}
			fieldsData={fields}
			onFieldDelete={onFieldDeleteHandler}
			onFieldChange={() => void 0}
			onFieldOrderChange={onFieldOrderChange}
		/> ||
		<FieldsDrawerPlaceholder />
	);

	return (
		<div className="fields-page">
			<PageHeader name={name} onBack={props.onBack}>
				<FieldsAddIcon className="add" onClick={onFieldAddHandler} />
			</PageHeader>
			{fullPageElement}
		</div >
	);
}

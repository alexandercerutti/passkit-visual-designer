import * as React from "react";
import "./style.less";
import { FieldProps } from "../../../../passes/Areas/components/Field";
import { FieldsAddIcon } from "./icons";
import Drawer from "./Drawer";
import DrawerPlaceholder from "./DrawerPlaceholder";
import PageHeader from "../Header";
import { PageProps, PageNavigation } from "../pages";

interface Props extends PageProps, PageNavigation {
	value?: FieldProps[];
}

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
			requestPageCreation={props.requestPageCreation}
		/> ||
		<DrawerPlaceholder />
	);

	return (
		<div className="fields-preview-page">
			<PageHeader name={name} requestPageClosing={props.requestPageClosing}>
				<FieldsAddIcon className="add" onClick={onFieldAddHandler} />
			</PageHeader>
			{fullPageElement}
		</div >
	);
}

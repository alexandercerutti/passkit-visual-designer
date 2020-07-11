import * as React from "react";
import { v1 as uuid } from "uuid";
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
	const [fields, setFields] = React.useState(
		(props.value || []).map(data => ({
			fieldUUID: uuid(),
			...data
		}))
	);
	const name = `${props.name.slice(0, 1).toUpperCase()}${props.name.slice(1)}`;

	const onFieldDeleteHandler = (fieldUUID: string) => {
		const fieldWithKeyIndex = fields.findIndex(f => f.fieldUUID === fieldUUID);
		const newFields = [...fields];
		newFields.splice(fieldWithKeyIndex, 1);
		setFields(newFields);
	};

	const onFieldAddHandler = () => {
		setFields([
			...fields, {
				fieldUUID: uuid()
			} as FieldProps & { fieldUUID: string }
		]);
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
		<DrawerPlaceholder />
	);

	return (
		<div className="fields-preview-page">
			<PageHeader name={name}>
				<FieldsAddIcon className="add" onClick={onFieldAddHandler} />
			</PageHeader>
			{fullPageElement}
		</div>
	);
}

import * as React from "react";
import "./style.less";
import { FieldPanelProps } from "..";
import { FieldProps } from "../../../../../../passes/Areas/components/Field";
import { FieldsArrowIcon, FieldsAddIcon } from "../icons";
import FieldTitle from "../../FieldTitle";
import FieldsDrawer from "../FieldsDrawer";
import FieldsDrawerPlaceholder from "./components/FieldDrawerPlaceholder";

interface FieldsPageProps extends Omit<FieldPanelProps, "requestPageClosing" | "requestPageCreation"> {
	onBack(): void;
}

export default function FieldsPage(props: FieldsPageProps) {
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
		<FieldsDrawer
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
			<header>
				<div className="back" onClick={props.onBack}>
					<FieldsArrowIcon />
					<span>Back</span>
				</div>
				<FieldTitle name={name} />
				<FieldsAddIcon className="add" onClick={onFieldAddHandler} />
			</header>
			{fullPageElement}
		</div >
	);
}

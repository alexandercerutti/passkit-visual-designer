import * as React from "react";
import { FieldPanelProps } from ".";
import { FieldProps } from "../../../../../passes/Areas/components/Field";
import { FieldsArrowIcon, FieldsAddIcon, MoreFieldsBelowIcon } from "./icons";
import FieldTitle from "../FieldTitle";
import FieldsDrawer from "./FieldsDrawer";
import { getSafeFieldData } from "../../../../../passes/Areas/components/Field/getSafeFieldData";
import { FieldsDrawerPlaceholder } from "./FieldsDrawer/placeholder";

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

	const fullPageElement = (
		fields.length &&
		<FieldsDrawer
			{...props}
			fieldsData={fields}
			onFieldDelete={onFieldDeleteHandler}
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

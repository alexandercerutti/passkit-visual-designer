import * as React from "react";
import { v1 as uuid } from "uuid";
import "./style.less";
import { PassFieldKeys } from "../../../../passes/constants";
import { FieldsAddIcon } from "./icons";
import Drawer from "./Drawer";
import DrawerPlaceholder from "./DrawerPlaceholder";
import PageHeader from "../Header";
import { PageProps, PageNavigation } from "../pages";

interface Props extends PageProps, PageNavigation {
	value?: PassFieldKeys[];
}

interface State {
	fields: (PassFieldKeys & { fieldUUID: string })[]
}

export default class FieldsPreviewPage extends React.Component<Props, State> {
	private readonly pageName = `${this.props.name.slice(0, 1).toUpperCase()}${this.props.name.slice(1)}`;

	constructor(props: Props) {
		super(props);

		this.state = {
			fields: (props.value || []).map(data => ({
				fieldUUID: uuid(),
				...data
			}))
		};

		this.onFieldAddHandler = this.onFieldAddHandler.bind(this);
		this.onFieldDeleteHandler = this.onFieldDeleteHandler.bind(this);
		this.onFieldOrderChange = this.onFieldOrderChange.bind(this);
		this.onFieldChangeHandler = this.onFieldChangeHandler.bind(this);
	}

	onFieldDeleteHandler(fieldUUID: string) {
		this.setState(({ fields }) => {
			const fieldWithKeyIndex = fields.findIndex(f => f.fieldUUID === fieldUUID);
			const newFields = [...fields];
			newFields.splice(fieldWithKeyIndex, 1);

			return { fields: newFields };
		});
	}

	onFieldAddHandler() {
		this.setState(({ fields }) => {
			return {
				fields: [
					...fields,
					{
						fieldUUID: uuid()
					} as PassFieldKeys & { fieldUUID: string }
				]
			}
		});
	}

	onFieldOrderChange(fromIndex: number, of: number): void {
		this.setState(({ fields: previousFields }) => {
			// Creating a copy of the array and swapping two elements
			const nextFields = previousFields.slice(0);

			nextFields[fromIndex] = [
				nextFields[fromIndex + of],
				nextFields[fromIndex + of] = nextFields[fromIndex]
			][0];

			return {
				fields: nextFields
			};
		});
	}

	onFieldChangeHandler(fieldUUID: string, fieldProps: PassFieldKeys) {
		this.setState(({ fields: previousFields }) => {
			const fieldIndex = previousFields.findIndex(f => f.fieldUUID === fieldUUID);

			if (fieldIndex < 0) {
				return null;
			}

			const fields = previousFields.slice(0);
			fields.splice(
				fieldIndex,
				1,
				Object.assign(fields[fieldIndex], fieldProps)
			);

			console.log("onFieldChange for", fieldProps, fieldUUID);

			return { fields };
		});
	}

	render() {
		const { fields } = this.state;

		const fullPageElement = (
			this.state.fields.length &&
			<Drawer
				{...this.props}
				fieldsData={fields}
				onFieldChange={this.onFieldChangeHandler}
				onFieldDelete={this.onFieldDeleteHandler}
				onFieldOrderChange={this.onFieldOrderChange}
			/> ||
			<DrawerPlaceholder />
		);

		return (
			<div className="fields-preview-page">
				<PageHeader name={this.pageName}>
					<FieldsAddIcon className="add" onClick={this.onFieldAddHandler} />
				</PageHeader>
				{fullPageElement}
			</div>
		);
	}
}

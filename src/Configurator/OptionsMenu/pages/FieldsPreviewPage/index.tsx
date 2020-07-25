import * as React from "react";
import { v1 as uuid } from "uuid";
import "./style.less";
import { PassFieldKeys } from "../../../../Pass/constants";
import { FieldsAddIcon } from "./icons";
import Drawer from "./Drawer";
import DrawerPlaceholder from "./DrawerPlaceholder";
import PageHeader from "../components/Header";
import { PageProps, PageNavigation } from "../usePageFactory";

interface Props extends PageProps, PageNavigation {
	value?: PassFieldKeys[];
	onChange(fieldData: PassFieldKeys[]): void;
}

interface State {
	fields: PassFieldKeys[];
	fieldsUUIDs: string[];
}

export default class FieldsPreviewPage extends React.Component<Props, State> {
	private readonly pageName = `${this.props.name.slice(0, 1).toUpperCase()}${this.props.name.slice(1)}`;

	constructor(props: Props) {
		super(props);

		this.state = {
			fields: props.value ?? [],
			fieldsUUIDs: props.value?.map(_ => uuid()) ?? [],
		};

		this.onFieldAddHandler = this.onFieldAddHandler.bind(this);
		this.onFieldDeleteHandler = this.onFieldDeleteHandler.bind(this);
		this.onFieldOrderChange = this.onFieldOrderChange.bind(this);
		this.onFieldChangeHandler = this.onFieldChangeHandler.bind(this);
	}

	componentDidUpdate(_: Props, prevState: State) {
		if (prevState.fields !== this.state.fields) {
			this.props.onChange(this.state.fields);
		}
	}

	onFieldDeleteHandler(fieldUUID: string) {
		this.setState(({ fields, fieldsUUIDs }) => {
			const fieldIndex = fieldsUUIDs.findIndex(uuid => uuid === fieldUUID);

			if (fieldIndex < 0) {
				return null;
			}

			const newFields = [...fields];
			const newUUIDs = [...fieldsUUIDs];
			newFields.splice(fieldIndex, 1);
			newUUIDs.splice(fieldIndex, 1);

			return {
				fields: newFields,
				fieldsUUIDs: newUUIDs
			};
		});
	}

	onFieldAddHandler() {
		this.setState(({ fields, fieldsUUIDs: uuids }) => {
			return {
				fields: [
					...fields,
					{} as PassFieldKeys
				],
				fieldsUUIDs: [
					...uuids,
					uuid()
				]
			}
		});
	}

	onFieldOrderChange(fieldUUID: string, of: number): void {
		this.setState(({ fields: previousFields, fieldsUUIDs: prevUUIDs }) => {
			const fromIndex = prevUUIDs.findIndex(uuid => uuid === fieldUUID);

			// Creating a copy of the array and swapping two elements
			const nextFields = [...previousFields];
			const nextUUIDs = [...prevUUIDs];

			nextFields[fromIndex] = [
				nextFields[fromIndex + of],
				nextFields[fromIndex + of] = nextFields[fromIndex]
			][0];

			nextUUIDs[fromIndex] = [
				nextUUIDs[fromIndex + of],
				nextUUIDs[fromIndex + of] = nextUUIDs[fromIndex]
			][0];

			return {
				fields: nextFields,
				fieldsUUIDs: nextUUIDs,
			};
		});
	}

	onFieldChangeHandler(fieldUUID: string, fieldProps: PassFieldKeys) {
		this.setState(({ fields: previousFields, fieldsUUIDs }) => {
			const fieldIndex = fieldsUUIDs.findIndex(uuid => uuid === fieldUUID);

			if (fieldIndex < 0) {
				return null;
			}

			const fields = [...previousFields];
			// Adding to fields itself with new props but removing its old version before
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
		const { fields, fieldsUUIDs } = this.state;

		const fullPageElement = (
			this.state.fields.length &&
			<Drawer
				fieldsData={fields}
				fieldsUUIDs={fieldsUUIDs}
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

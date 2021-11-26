import * as React from "react";
import { v1 as uuid } from "uuid";
import "./style.less";
import { Pass } from "@pkvd/passkit-types";
import type { PassMixedProps } from "@pkvd/PKPass";
import { FieldsAddIcon } from "./icons";
import Drawer from "./Drawer";
import DrawerPlaceholder from "./DrawerPlaceholder";
import PageHeader from "../components/Header";
import DrawerJSONEditor from "./DrawerJSONEditor";
import { PageContainer } from "../../PageContainer";
import { connect } from "react-redux";
import * as Store from "@pkvd/store";
import FieldsPropertiesEditPage from "../FieldsPropertiesEditPage";
import { navigable, NavigableProps, PageProps } from "../../navigation.utils";

interface Props extends PageProps, Partial<NavigableProps> {
	value?: Pass.PassFieldContent[];
	changePassPropValue?: typeof Store.Pass.setProp;
}

interface State {
	currentEditingFieldUUID: string;
	isJSONMode?: boolean;
}

class FieldsPreviewPage extends React.Component<Props, State> {
	private readonly pageName = `${this.props.name.slice(0, 1).toUpperCase()}${this.props.name.slice(
		1
	)}`;

	constructor(props: Props) {
		super(props);

		this.state = {
			currentEditingFieldUUID: null,
			isJSONMode: false,
		};

		this.onFieldAddHandler = this.onFieldAddHandler.bind(this);
		this.onFieldDeleteHandler = this.onFieldDeleteHandler.bind(this);
		this.onFieldOrderChange = this.onFieldOrderChange.bind(this);
		this.onFieldsChangeFromJSON = this.onFieldsChangeFromJSON.bind(this);
		this.toggleJSONMode = this.toggleJSONMode.bind(this);
		this.openDetailsPage = this.openDetailsPage.bind(this);
		this.closeDetailsPage = this.closeDetailsPage.bind(this);
	}

	onFieldDeleteHandler(fieldUUID: string) {
		const fieldIndex = this.props.value.findIndex((element) => element.fieldUUID === fieldUUID);

		const newFields = [...this.props.value];
		newFields.splice(fieldIndex, 1);

		this.props.changePassPropValue(this.props.name as keyof PassMixedProps, newFields);
	}

	onFieldAddHandler() {
		this.props.changePassPropValue(this.props.name as keyof PassMixedProps, [
			...(this.props.value || []),
			{ fieldUUID: uuid() } as Pass.PassFieldContent,
		]);
	}

	onFieldOrderChange(fieldUUID: string, of: number): void {
		const fromIndex = this.props.value.findIndex((element) => element.fieldUUID === fieldUUID);
		const nextFields = [...this.props.value];

		nextFields[fromIndex] = [
			nextFields[fromIndex + of],
			(nextFields[fromIndex + of] = nextFields[fromIndex]),
		][0];

		this.props.changePassPropValue(this.props.name as keyof PassMixedProps, nextFields);
	}

	onFieldsChangeFromJSON(jsonString: string) {
		try {
			const fields = JSON.parse(jsonString) as Pass.PassFieldContent[];

			this.props.changePassPropValue(this.props.name as keyof PassMixedProps, fields);
		} catch (err) {
			console.error(err);
		}
	}

	openDetailsPage(fieldUUID: string) {
		this.props.openPage(this.props.pagesStatuses.length - 1);
		this.setState({
			currentEditingFieldUUID: fieldUUID,
		});
	}

	closeDetailsPage() {
		this.setState({
			currentEditingFieldUUID: null,
		});

		this.props.closePage(0);
	}

	toggleJSONMode() {
		this.setState(({ isJSONMode }) => ({
			isJSONMode: !isJSONMode,
		}));
	}

	render() {
		const { isJSONMode, currentEditingFieldUUID } = this.state;

		let contentElement: React.ReactElement<
			typeof DrawerJSONEditor | typeof Drawer | typeof DrawerPlaceholder
		>;

		if (isJSONMode) {
			contentElement = (
				<DrawerJSONEditor
					fieldName={this.props.name as keyof Pass.PassFieldContent}
					content={this.props.value ?? []}
					onChange={this.onFieldsChangeFromJSON}
				/>
			);
		} else if (this.props.value?.length) {
			contentElement = (
				<Drawer
					fieldsData={this.props.value}
					onFieldDelete={this.onFieldDeleteHandler}
					onFieldOrderChange={this.onFieldOrderChange}
					openDetailsPage={this.openDetailsPage}
				/>
			);
		} else {
			contentElement = <DrawerPlaceholder />;
		}

		return (
			<>
				<PageContainer>
					<div className="fields-preview-page">
						<PageHeader name={this.pageName} onBack={this.props.onBack}>
							<FieldsAddIcon
								className="add"
								onClick={() => !isJSONMode && this.onFieldAddHandler()}
							/>
						</PageHeader>
						{contentElement}
						<footer>
							<button
								className={(isJSONMode && "json-mode-active") || ""}
								onClick={this.toggleJSONMode}
							>
								JSON
							</button>
						</footer>
					</div>
				</PageContainer>
				{(this.props.pagesStatuses[0] && (
					<FieldsPropertiesEditPage
						fieldUUID={currentEditingFieldUUID}
						name={this.props.name}
						onBack={this.closeDetailsPage}
					/>
				)) ||
					null}
			</>
		);
	}
}

/**
 * While I'm mainly against this approach (of having components other than main ones
 * linked directly to the state), this way was the easiest one to adopt as the pages
 * gets creates in a sort-of arbitrarily way and their props heavily depend
 * on the caller. This caused a lot of troubles in terms of bad code and bad props
 * passed to the pages components. For this reason, the best way for this is to have
 * pages components to pick props directly from store.
 */

export default navigable(
	connect(
		function (state: Store.State, props: Props) {
			const { name } = props;

			return {
				value: state.pass[name],
			};
		},
		{
			changePassPropValue: Store.Pass.setProp,
		}
	)(FieldsPreviewPage),
	FieldsPropertiesEditPage
);

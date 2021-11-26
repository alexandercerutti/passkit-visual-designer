import * as React from "react";
import "./style.less";
import { Pass } from "@pkvd/passkit-types";
import { PassMixedProps } from "@pkvd/PKPass";
import * as Store from "packages/app/src/store";
import PageHeader from "../components/Header";
import FieldPreview from "../components/FieldPreview";
import FieldPropertiesEditList from "./FieldPropertiesEditList";
import { PageContainer } from "../../PageContainer";
import { PageProps } from "../../navigation.utils";
import { connect } from "react-redux";

interface Props extends PageProps {
	selectedField?: Pass.PassFieldContent[];
	fieldUUID: string;
	changePassPropValue?: typeof Store.Pass.setProp;
}

class FieldsPropertiesEditPage extends React.Component<Props> {
	private dataIndex: number;

	constructor(props: Props) {
		super(props);

		this.dataIndex = this.props.selectedField.findIndex(
			(field) => field.fieldUUID === this.props.fieldUUID
		);

		this.updateValue = this.updateValue.bind(this);
		this.updatePassProp = this.updatePassProp.bind(this);
		this.updateKey = this.updateKey.bind(this);
	}

	updateValue(newData: Pass.PassFieldContent) {
		const allFieldsCopy = [...this.props.selectedField];
		allFieldsCopy.splice(this.dataIndex, 1, newData);

		this.props.changePassPropValue(this.props.name as keyof PassMixedProps, allFieldsCopy);
	}

	updatePassProp<T>(prop: string, value: T) {
		this.updateValue({ ...this.props.selectedField[this.dataIndex], [prop]: value });
	}

	updateKey(value: string) {
		this.updatePassProp("key", value);
	}

	render() {
		const current = this.props.selectedField[this.dataIndex];

		return (
			<PageContainer>
				<div id="fields-properties-edit-page">
					<PageHeader onBack={this.props.onBack} />
					<FieldPreview keyEditable onFieldKeyChange={this.updateKey} previewData={current} />
					<FieldPropertiesEditList data={current} onValueChange={this.updatePassProp} />
				</div>
			</PageContainer>
		);
	}
}

export default connect(
	(store: Store.State, ownProps: Props) => {
		const { pass } = store;

		const selectedField = pass[ownProps.name as keyof Pass.PassFieldContent];

		return {
			selectedField,
		};
	},
	{
		changePassPropValue: Store.Pass.setProp,
	}
)(FieldsPropertiesEditPage);

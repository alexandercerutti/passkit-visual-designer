import * as React from "react";
import "./style.less";
import { FieldProperties } from "../../../../../passes/Areas/components/Field/fieldCommons";

interface Props {
	previewData: FieldProperties
}

export default function FieldPreview(props: Props) {
	return (
		<div className="field-preview">
			<h4>field: {props.previewData?.fieldKey}</h4>
			<span className="label">{props.previewData.label}</span>
			<span className="value">{props.previewData.value}</span>
		</div>
	);
}

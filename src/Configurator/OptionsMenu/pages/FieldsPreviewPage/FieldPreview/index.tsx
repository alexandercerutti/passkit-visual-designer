import * as React from "react";
import "./style.less";
import { FieldProperties } from "../../../../../passes/Areas/components/Field/fieldCommons";

interface Props {
	previewData: FieldProperties;
	isFieldHidden?: boolean;
}

export default function FieldPreview(props: Props) {
	const isPresetFieldKey = props.previewData.fieldKey.includes("::pkvd-new");

	return (
		<div className={`field-preview${props.isFieldHidden && " hidden" || ""}`}>
			<div className={`preview-field-key${isPresetFieldKey && " none" || ""}`}>
				<span>{isPresetFieldKey ? "not setted" : props.previewData?.fieldKey}</span>
			</div>
			<div className="preview-main-box">
				<span className="label">{props.previewData.label || "label"}</span>
				<span className="value">{props.previewData.value || "value"}</span>
			</div>
		</div>
	);
}

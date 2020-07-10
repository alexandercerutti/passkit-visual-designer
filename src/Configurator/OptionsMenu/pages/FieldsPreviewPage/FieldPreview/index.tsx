import * as React from "react";
import "./style.less";
import { FieldProperties } from "../../../../../passes/Areas/components/Field/fieldCommons";
import { createClassName } from "../../../../../passes/utils";

interface Props {
	previewData: FieldProperties;
	isFieldHidden?: boolean;
	keyEditable?: boolean;
	onClick?(): void;
	onFieldKeyChange?(newValue: string): void;
}

export default function FieldPreview(props: Props) {
	const isPresetFieldKey = props.previewData.fieldKey.includes("::pkvd-new");
	const [fieldKey, setFieldKey] = React.useState(!isPresetFieldKey ? props.previewData.fieldKey : "");

	React.useEffect(() => {
		if (props.onFieldKeyChange && fieldKey !== props.previewData.fieldKey) {
			props.onFieldKeyChange(fieldKey);
		}
	}, [fieldKey]);

	const FPClassName = createClassName(["field-preview"], {
		"hidden": props.isFieldHidden,
		"editable": props.keyEditable
	});

	const previewKeyClassName = createClassName(["preview-field-key"], {
		"none": isPresetFieldKey
	});

	const fieldKeyRow = props.keyEditable
		? (
			<input
				type="text"
				onChange={(evt) => setFieldKey(evt.target.value.replace(/\s+/, ""))}
				value={fieldKey}
				placeholder="field key"
			/>
		) : (
			<span>
				{isPresetFieldKey ? "not setted" : fieldKey}
			</span>
		);

	return (
		<div
			className={FPClassName}
			onClick={props?.onClick}
		>
			<div className={previewKeyClassName}>
				{fieldKeyRow}
			</div>
			<div className="preview-main-box">
				<span className="label">{props.previewData.label || "label"}</span>
				<span className="value">{props.previewData.value || "value"}</span>
			</div>
		</div>
	);
}

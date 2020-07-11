import * as React from "react";
import "./style.less";
import { FieldProperties } from "../../../../../passes/Areas/components/Field/fieldCommons";
import { createClassName } from "../../../../../passes/utils";
import { PKTextAlignment } from "../../../../../passes/constants";

interface Props {
	fieldUUID: string;
	previewData: FieldProperties;
	isFieldHidden?: boolean;
	keyEditable?: boolean;
	onClick?(): void;
	onFieldKeyChange?(fieldUUID: string, newValue: string): void;
}

export default function FieldPreview(props: Props) {
	const [fieldKey, setFieldKey] = React.useState(props.previewData?.fieldKey ?? "");

	/** Updating parent component */

	React.useEffect(() => {
		if (props.onFieldKeyChange && fieldKey !== props.previewData.fieldKey) {
			props.onFieldKeyChange(props.fieldUUID, fieldKey);
		}
	}, [fieldKey]);

	/** Effect to update the state value when props changes */

	React.useEffect(() => {
		const { fieldKey: propsFieldKey } = props.previewData;
		if (propsFieldKey && propsFieldKey !== fieldKey) {
			setFieldKey(propsFieldKey);
		}
	}, [props.previewData.fieldKey]);

	const FPClassName = createClassName(["field-preview"], {
		"hidden": props.isFieldHidden,
		"editable": props.keyEditable
	});

	const previewKeyClassName = createClassName(["preview-field-key"], {
		"none": !fieldKey
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
				{!fieldKey ? "not setted" : fieldKey}
			</span>
		);

	const { textAlignment } = props.previewData ?? {};

	const fieldStylesClassName = createClassName(["preview-main-box"], {
		"align-left": textAlignment === PKTextAlignment.Left,
		"align-right": textAlignment === PKTextAlignment.Right,
		"align-center": textAlignment === PKTextAlignment.Center,
		"align-natural": textAlignment === PKTextAlignment.Natural || !textAlignment,
		// @TODO: style dates
	});

	return (
		<div
			className={FPClassName}
			onClick={props?.onClick}
		>
			<div className={previewKeyClassName}>
				{fieldKeyRow}
			</div>
			<div className={fieldStylesClassName}>
				<span className="label">{props.previewData?.label || "label"}</span>
				<span className="value">{props.previewData?.value || "value"}</span>
			</div>
		</div>
	);
}

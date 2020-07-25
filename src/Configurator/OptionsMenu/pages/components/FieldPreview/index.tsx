import * as React from "react";
import "./style.less";
import { createClassName } from "../../../../../utils";
import { PKTextAlignment, PassFieldKeys } from "../../../../../Pass/constants";

interface Props {
	fieldUUID: string;
	previewData: PassFieldKeys;
	isFieldHidden?: boolean;
	keyEditable?: boolean;
	onClick?(): void;
	onFieldKeyChange?(fieldUUID: string, newValue: string): void;
}

export default function FieldPreview(props: Props) {
	const [key, setKey] = React.useState(props.previewData?.key);

	/** Updating parent component */

	React.useEffect(() => {
		if (props.onFieldKeyChange && key !== props.previewData.key) {
			props.onFieldKeyChange(props.fieldUUID, key);
		}
	}, [key]);

	/** Effect to update the state value when props changes */

	React.useEffect(() => {
		const { key: fieldKey } = props.previewData;
		if (fieldKey && fieldKey !== key) {
			setKey(fieldKey);
		}
	}, [props.previewData.key]);

	const FPClassName = createClassName(["field-preview"], {
		"hidden": props.isFieldHidden,
		"editable": props.keyEditable
	});

	const previewKeyClassName = createClassName(["preview-field-key"], {
		"none": !key
	});

	const fieldKeyRow = props.keyEditable
		? (
			<input
				type="text"
				onChange={(evt) => setKey(evt.target.value.replace(/\s+/, ""))}
				value={key || ""}
				placeholder="field's key"
			/>
		) : (
			<span>
				{!key ? "not setted" : key}
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

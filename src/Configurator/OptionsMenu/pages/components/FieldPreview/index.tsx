import * as React from "react";
import "./style.less";
import { Pass } from "@pkvd/passkit-types";
import { createClassName } from "../../../../../utils";
import CommittableTextInput from "../../../../CommittableTextInput";

interface Props {
	previewData: Pass.PassFieldContent;
	isFieldHidden?: boolean;
	keyEditable?: boolean;
	onClick?(): void;
	onFieldKeyChange?(newValue: string): void;
}

export default function FieldPreview(props: Props) {
	const [key, setKey] = React.useState(props.previewData?.key);

	const onFieldKeyChange = React.useCallback(
		(key: string) => {
			if (key !== props.previewData.key) {
				props.onFieldKeyChange(key);
			}
		},
		[props.previewData.key]
	);

	/** Effect to update the state value when props changes */

	React.useEffect(() => {
		const { key: fieldKey } = props.previewData;
		if (fieldKey && fieldKey !== key) {
			setKey(fieldKey);
		}
	}, [props.previewData.key]);

	const FPClassName = createClassName(["field-preview"], {
		hidden: props.isFieldHidden,
		editable: props.keyEditable,
	});

	const previewKeyClassName = createClassName(["preview-field-key"], {
		none: !key,
	});

	const fieldKeyRow = props.keyEditable ? (
		<CommittableTextInput
			onChange={(evt) => setKey(evt.target.value.replace(/\s+/, ""))}
			value={key || ""}
			placeholder="field's key"
			commit={onFieldKeyChange}
		/>
	) : (
		<span>{!key ? "not setted" : key}</span>
	);

	const { textAlignment } = props.previewData ?? {};

	const fieldStylesClassName = createClassName(["preview-main-box"], {
		"align-left": textAlignment === Pass.PKTextAlignment.Left,
		"align-right": textAlignment === Pass.PKTextAlignment.Right,
		"align-center": textAlignment === Pass.PKTextAlignment.Center,
		"align-natural": textAlignment === Pass.PKTextAlignment.Natural || !textAlignment,
		// @TODO: style dates
	});

	return (
		<div className={FPClassName} onClick={props?.onClick}>
			<div className={previewKeyClassName}>{fieldKeyRow}</div>
			<div className={fieldStylesClassName}>
				<span className="label">{props.previewData?.label || "label"}</span>
				<span className="value">{props.previewData?.value || "value"}</span>
			</div>
		</div>
	);
}

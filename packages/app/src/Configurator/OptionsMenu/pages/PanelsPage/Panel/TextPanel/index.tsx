import * as React from "react";
import "./style.less";
import { PKPassLayout } from "@pkvd/pkpass";
import { SharedPanelProps } from "..";
import useContentSavingHandler from "../useContentSavingHandler";
import CapitalHeaderTitle from "../../../components/CapitalHeaderTitle";
import CommittableTextInput from "../../../../../CommittableTextInput";

interface TextPanelProps extends SharedPanelProps {
	value?: string;
}

export default function TextPanel(props: TextPanelProps) {
	const [content, onContentSave] = useContentSavingHandler(
		props.onValueChange,
		props.name,
		props.value
	);
	const inputRef = React.useRef<HTMLInputElement>();

	const required = (props.data.required && <span className="required" />) || null;

	if (props.isSelected) {
		inputRef.current?.focus();
	}

	return (
		<div className={`panel ${PKPassLayout.FieldKind.TEXT}`} data-name={props.name}>
			<label htmlFor={props.name}>
				<CapitalHeaderTitle name={props.name} />
				{required}
			</label>
			<CommittableTextInput
				ref={inputRef}
				id={props.name}
				placeholder={props.name}
				defaultValue={content}
				commit={onContentSave}
			/>
		</div>
	);
}

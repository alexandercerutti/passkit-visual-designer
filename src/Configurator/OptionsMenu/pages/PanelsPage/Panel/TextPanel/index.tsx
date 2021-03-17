import * as React from "react";
import { PanelProps } from "..";
import useContentSavingHandler from "../useContentSavingHandler";
import CapitalHeaderTitle from "../../../components/CapitalHeaderTitle";
import "./style.less";
import CommittableTextInput from "../../../../../CommittableTextInput";

interface TextPanelProps extends PanelProps {
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
		<>
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
		</>
	);
}

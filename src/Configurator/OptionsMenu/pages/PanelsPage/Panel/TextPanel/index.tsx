import * as React from "react";
import { PanelProps } from "..";
import useContentSavingHandler from "../useContentSavingHandler";
import CapitalHeaderTitle from "../../../components/CapitalHeaderTitle";
import "./style.less";

interface TextPanelProps extends PanelProps {
	value?: string;
}

export default function TextPanel(props: TextPanelProps) {
	const [content, onBlurEventRef] = useContentSavingHandler(props.onValueChange, props.name, props.value);
	const inputRef = React.useRef<HTMLInputElement>();

	const onKeyDownEventRef = React.useRef(({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
		key === "Enter" && currentTarget.blur();
	});

	const required = (
		props.data.required &&
		<span className="required" />
	) || null;

	if (props.isSelected) {
		inputRef.current?.focus();
	}

	return (
		<>
			<label htmlFor={props.name}>
				<CapitalHeaderTitle name={props.name} />
				{required}
			</label>
			<input
				ref={inputRef}
				id={props.name}
				placeholder={props.name}
				onBlur={(event) => onBlurEventRef(event.target.value)}
				onKeyDown={onKeyDownEventRef.current}
				onChange={(event) => onBlurEventRef(event.target.value)}
				defaultValue={content}
			/>
		</>
	);
}

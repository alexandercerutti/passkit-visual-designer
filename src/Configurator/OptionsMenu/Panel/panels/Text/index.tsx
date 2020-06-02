import * as React from "react";
import { PanelProps } from "../..";
import useContentSavingHandler from "../useContentSavingHandler";
import FieldTitle from "../FieldTitle";
import "./style.less";

interface TextPanelProps extends PanelProps {
	value?: string;
}

export default function TextPanel(props: TextPanelProps) {
	const [content, onBlurEventRef] = useContentSavingHandler(props.onValueChange, props.name, props.value);

	const onKeyDownEventRef = React.useRef(({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
		key === "Enter" && currentTarget.blur();
	});

	const required = (
		props.data.required &&
		<span className="required" />
	) || null;

	return (
		<>
			<label htmlFor={props.name}>
				<FieldTitle name={props.name} />
				{required}
			</label>
			<input
				id={props.name}
				placeholder={props.name}
				onBlur={(event) => onBlurEventRef(event.target.value)}
				onKeyDown={onKeyDownEventRef.current}
				defaultValue={content}
			/>
		</>
	);
}

import * as React from "react";
import { PanelProps } from "../..";
import useContentSavingHandler from "../useContentSavingHandler";
import "./style.less";

interface TextPanelProps extends PanelProps {
	value?: string;
}

export default function TextPanel(props: TextPanelProps) {
	const [content, onBlurEventRef] = useContentSavingHandler(props.onValueChange, props.name, props.value);

	const onKeyDownEventRef = React.useRef(({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
		key === "Enter" && currentTarget.blur();
	});

	const showTitle = props.name.replace(/([a-z])([A-Z])/g, "$1 $2");

	const required = (
		props.data.required &&
		<span className="required" />
	) || null;

	return (
		<>
			<label htmlFor={props.name}>
				<h4>{showTitle}</h4>
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

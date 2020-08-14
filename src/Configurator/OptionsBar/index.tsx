import * as React from "react";
import "./style.less";
import ShowMoreIcon from "./icons";

interface Props {
	rotatePass(): void;
}

export default function OptionsBar(props: Props) {
	return (
		<div className="options-bar">
			<ShowMoreIcon
				width="20px"
				height="20px"
				onClick={() => props.rotatePass()}
				style={{ cursor: "pointer " }}
			/>
		</div>
	);
}

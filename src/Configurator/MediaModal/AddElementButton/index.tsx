import * as React from "react";
import { PlusIcon } from "../icons";
import "./style.less";

interface Props {
	caption: string;
	onClick?(e: React.MouseEvent): void;
}

export default function AddElementButton(props: Props) {
	return (
		<>
			<div className="add-element-btn" onClick={props.onClick}>
				<PlusIcon />
			</div>
			<span>{props.caption}</span>
		</>
	);
}

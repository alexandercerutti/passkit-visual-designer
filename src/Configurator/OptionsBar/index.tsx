import * as React from "react";
import "./style.less";
import { ShowMoreIcon, EyeVisibleIcon, EyeInvisibleIcon } from "./icons";

interface Props {
	isEmptyVisible: boolean;
	rotatePass(): void;
	toggleEmptyVisibility(): void;
}

export default function OptionsBar(props: Props) {
	const EyeIcon = props.isEmptyVisible ? EyeVisibleIcon : EyeInvisibleIcon;

	return (
		<div className="options-bar">
			<EyeIcon
				width="20px"
				height="20px"
				onClick={() => props.toggleEmptyVisibility()}
			/>
			<ShowMoreIcon
				width="20px"
				height="20px"
				onClick={() => props.rotatePass()}
			/>
		</div>
	);
}

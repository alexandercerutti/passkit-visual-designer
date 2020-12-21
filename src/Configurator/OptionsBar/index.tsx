import * as React from "react";
import "./style.less";
import { ShowMoreIcon, EyeVisibleIcon, EyeInvisibleIcon, TranslationsIcon } from "./icons";

interface Props {
	isEmptyVisible: boolean;
	rotatePass(): void;
	toggleEmptyVisibility(): void;
	toggleTranslationsModal(): void;
}

export default function OptionsBar(props: Props) {
	const EyeIcon = props.isEmptyVisible ? EyeVisibleIcon : EyeInvisibleIcon;

	return (
		<div className="options-bar">
			<div title="Open translations tool">
				<TranslationsIcon
					onClick={props.toggleTranslationsModal}
				/>
			</div>
			<div title="Hide empty fields">
				<EyeIcon
					onClick={() => props.toggleEmptyVisibility()}
				/>
			</div>
			<div title="Show back fields">
				<ShowMoreIcon
					onClick={() => props.rotatePass()}
				/>
			</div>
		</div>
	);
}

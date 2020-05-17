import * as React from "react";
import { TwitterPicker, RGBColor, ColorResult } from "react-color";
import { PanelProps } from "../..";
import "./style.less";

interface ColorPanelProps extends PanelProps {
	value?: string;
}

export default function ColorPanel(props: ColorPanelProps) {
	const [color, setColor] = React.useState<string>(props.value || "rgb(0,0,0)");
	const showTitle = props.name.replace(/([a-z])([A-Z])/g, "$1 $2");

	const onColorChange = React.useRef((color: ColorResult) => {
		const rgbColor = rgbaToRGBString(color.rgb);
		setColor(rgbColor);
		props.onValueChange(props.name, rgbColor);
	});

	return (
		<>
			<h4>{showTitle}</h4>
			<TwitterPicker
				triangle="hide"
				// PR #403 on react-color: https://github.com/casesandberg/react-color/pull/403 TO FIX
				className="color-selector"
				color={color}
				onChangeComplete={onColorChange.current}
			/>
		</>
	);
}

function rgbaToRGBString({ r, g, b }: RGBColor) {
	return `rgb(${r},${g},${b})`;
}

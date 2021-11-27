import * as React from "react";
import { TwitterPicker, RGBColor, ColorState } from "react-color";
import { SharedPanelProps } from "..";
import useContentSavingHandler from "../useContentSavingHandler";
import CapitalHeaderTitle from "../../../components/CapitalHeaderTitle";
import "./style.less";
import { PKPassLayout } from "@pkvd/pkpass";

interface ColorPanelProps extends SharedPanelProps {
	value?: string;
}

export default function ColorPanel(props: ColorPanelProps) {
	const [color, onContentChangeHandler] = useContentSavingHandler(
		props.onValueChange,
		props.name,
		props.value || "rgb(0,0,0)"
	);

	// Default react-color hashes
	const { current: colorHistory } = React.useRef<string[]>([
		"#ff6900",
		"#fcb900",
		"#7bdcb5",
		"#00d084",
		"#8ed1fc",
		"#0693e3",
		"#abb8c3",
		"#eb144c",
		"#f78da7",
		"#9900ef",
	]);

	const onColorChange = React.useRef(({ rgb, hex }: ColorState) => {
		const colorInRecentlyUsedIndex = colorHistory.indexOf(hex);

		if (colorInRecentlyUsedIndex === -1) {
			colorHistory.unshift(hex);
			colorHistory.pop(); // to keep them 10
		} else if (colorInRecentlyUsedIndex !== 0) {
			colorHistory.unshift(...colorHistory.splice(colorInRecentlyUsedIndex, 1));
		}

		const rgbColor = rgbaToRGBString(rgb);
		onContentChangeHandler(rgbColor);
	});

	return (
		<div className={`panel ${PKPassLayout.FieldKind.COLOR}`} data-name={props.name}>
			<CapitalHeaderTitle name={props.name} />
			<TwitterPicker
				triangle="hide"
				className="color-selector"
				color={color}
				colors={colorHistory}
				onChangeComplete={onColorChange.current}
			/>
		</div>
	);
}

function rgbaToRGBString({ r, g, b }: RGBColor) {
	return `rgb(${r},${g},${b})`;
}

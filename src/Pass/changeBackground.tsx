const DEFAULT_BACKGROUND_COLOR = "#e6e6e6";

export default function changeBackground(background?: string) {
	let finalBG = background;

	if (!background) {
		finalBG = DEFAULT_BACKGROUND_COLOR;
	} else if (background?.includes("://")) {
		finalBG = `url(${background})`;
	}

	const { style } = document.documentElement;

	if (style.getPropertyValue("--pass-background") === finalBG) {
		return;
	}

	document.documentElement.style.setProperty("--pass-background", finalBG);
}

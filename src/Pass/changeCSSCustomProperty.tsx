export default function changeCSSCustomProperty(key: string, value: string, defaultValue: string) {
	let finalValue = value;

	if (!value) {
		finalValue = defaultValue;
	} else if (value?.includes("://")) {
		finalValue = `url(${value})`;
	}

	const { style } = document.documentElement;

	if (style.getPropertyValue(key) === finalValue) {
		return;
	}

	document.documentElement.style.setProperty(key, finalValue);
}

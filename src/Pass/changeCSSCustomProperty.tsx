import * as React from "react";

export default function useCSSCustomProperty(
	ref: React.RefObject<HTMLDivElement>,
	name: string,
	value: string
) {
	React.useLayoutEffect(() => {
		const { current } = ref;

		if (!current) {
			return;
		}

		if (value.includes("://")) {
			value = `url(${value})`;
		}

		const prefixedName = `--pass-${name}`;

		if (current.style.getPropertyValue(prefixedName) === value) {
			return;
		}

		current.style.setProperty(prefixedName, value);
	}, [value]);
}

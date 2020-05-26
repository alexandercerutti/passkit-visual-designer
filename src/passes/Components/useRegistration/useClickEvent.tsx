import * as React from "react";
import { onSelect } from ".";

export default function useClickEvent(id: string, onClick: onSelect, element: React.ReactElement<any>) {
	if (!(onClick && id)) {
		console.warn("DEV: Supposed click event usage but no onClick or id received. ID:", id, "; onClick:", onClick);
		return element;
	}

	return React.cloneElement(element, {
		onClick: (e: React.MouseEvent) => onClick(id)
	});
}

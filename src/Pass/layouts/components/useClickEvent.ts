import * as React from "react";
import { FieldSelectHandler } from "../sections/useRegistrations";

export default function useClickEvent(
	onClick: FieldSelectHandler,
	element: React.ReactElement<any>
) {
	if (!onClick) {
		return element;
	}

	if (element.type === React.Fragment) {
		// Mapping the fragment props on children
		const children = React.Children.map(element.props.children, (node) =>
			React.cloneElement(node, { onClick })
		);

		return React.cloneElement(element, {}, children);
	}

	return React.cloneElement(element, { onClick });
}

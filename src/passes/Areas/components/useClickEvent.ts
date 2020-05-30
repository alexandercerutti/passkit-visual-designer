import * as React from "react";
import { FieldSelectHandler } from "../useRegistrations";

export default function useClickEvent(onClick: FieldSelectHandler, element: React.ReactElement<any>) {
	if (!onClick) {
		return element;
	}

	return React.cloneElement(element, { onClick });
}

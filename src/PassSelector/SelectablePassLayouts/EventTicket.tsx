import * as React from "react";
import useAlternativesRegistration from "../useAlternativesRegistration";
import { EventTicket as PassLayout } from "../../Pass/layouts";
import { PassMixedProps } from "../../Pass";
import { PassKind } from "../../model";

/**
 * Layout proxy with alternatives registration capability.
 *
 * @param props
 * @returns
 */

export default function EventTicket(props: PassMixedProps) {
	useAlternativesRegistration(
		PassKind.EVENT,
		{
			name: "With background image",
			specificProps: {
				backgroundImage: null,
			},
		},
		{
			name: "With strip image",
			specificProps: {
				stripImage: null,
			},
		}
	);

	return <PassLayout {...props} />;
}

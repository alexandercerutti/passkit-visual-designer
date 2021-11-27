import * as React from "react";
import { PassKind, PKPassLayout, PassMixedProps } from "@pkvd/pkpass";
import useAlternativesRegistration from "../useAlternativesRegistration";

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

	return <PKPassLayout.EventTicket {...props} />;
}

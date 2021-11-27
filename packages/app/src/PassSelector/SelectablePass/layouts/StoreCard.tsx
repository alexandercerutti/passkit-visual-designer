import * as React from "react";
import { PassKind, PKPassLayout, PassMixedProps } from "@pkvd/pkpass";
import useAlternativesRegistration from "../useAlternativesRegistration";

/**
 * Layout proxy with alternatives registration capability.
 *
 * @param props
 * @returns
 */

export default function StoreCard(props: PassMixedProps) {
	useAlternativesRegistration(PassKind.STORE, {
		name: "StoreCard",
		specificProps: {},
	});

	return <PKPassLayout.StoreCard {...props} />;
}

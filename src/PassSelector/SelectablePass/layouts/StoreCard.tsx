import * as React from "react";
import { Layouts, PassMixedProps } from "@pkvd/pass";
import useAlternativesRegistration from "../useAlternativesRegistration";
import { PassKind } from "../../../model";

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

	return <Layouts.StoreCard {...props} />;
}

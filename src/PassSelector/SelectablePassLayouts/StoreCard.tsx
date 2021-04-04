import * as React from "react";
import useAlternativesRegistration from "../useAlternativesRegistration";
import { StoreCard as PassLayout } from "../../Pass/layouts";
import { PassMixedProps } from "../../Pass";
import { PassKind } from "../../model";

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

	return <PassLayout {...props} />;
}

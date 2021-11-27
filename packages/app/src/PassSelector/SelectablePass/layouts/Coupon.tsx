import * as React from "react";
import { PKPassLayout, PassKind, PassMixedProps } from "@pkvd/pkpass";
import useAlternativesRegistration from "../useAlternativesRegistration";

/**
 * Layout proxy with alternatives registration capability.
 *
 * @param props
 * @returns
 */

export default function Coupon(props: PassMixedProps) {
	useAlternativesRegistration(PassKind.COUPON, {
		name: "Coupon Pass",
		specificProps: {},
	});

	return <PKPassLayout.Coupon {...props} />;
}

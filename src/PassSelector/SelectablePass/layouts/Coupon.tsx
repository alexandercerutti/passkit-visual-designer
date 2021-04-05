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

export default function Coupon(props: PassMixedProps) {
	useAlternativesRegistration(PassKind.COUPON, {
		name: "Coupon Pass",
		specificProps: {},
	});

	return <Layouts.Coupon {...props} />;
}

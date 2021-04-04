import * as React from "react";
import useAlternativesRegistration from "../useAlternativesRegistration";
import { Coupon as PassLayout } from "../../../Pass/layouts";
import { PassMixedProps } from "../../../Pass";
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

	return <PassLayout {...props} />;
}

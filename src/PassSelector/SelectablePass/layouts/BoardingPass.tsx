import * as React from "react";
import { Layouts, PassMixedProps, Constants } from "@pkvd/pass";
import useAlternativesRegistration from "../useAlternativesRegistration";
import { PassKind } from "../../../model";

const { PKTransitType } = Constants;

/**
 * Layout proxy with alternatives registration capability.
 *
 * @param props
 * @returns
 */

export default function BoardingPass(props: PassMixedProps) {
	useAlternativesRegistration(
		PassKind.BOARDING_PASS,
		{
			name: "Generic Boarding Pass",
			specificProps: {
				transitType: PKTransitType.Generic,
			},
		},
		{
			name: "Air Boarding Pass",
			specificProps: {
				transitType: PKTransitType.Air,
			},
		},
		{
			name: "Boat Boarding Pass",
			specificProps: {
				transitType: PKTransitType.Boat,
			},
		},
		{
			name: "Bus Boarding Pass",
			specificProps: {
				transitType: PKTransitType.Bus,
			},
		},
		{
			name: "Train Boarding Pass",
			specificProps: {
				transitType: PKTransitType.Train,
			},
		}
	);

	return <Layouts.BoardingPass {...props} />;
}

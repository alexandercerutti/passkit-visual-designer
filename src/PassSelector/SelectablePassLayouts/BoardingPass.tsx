import * as React from "react";
import useAlternativesRegistration from "../../Pass/useAlternativesRegistration";
import { BoardingPass as PassLayout } from "../../Pass/layouts";
import { PassMixedProps } from "../../Pass";
import { PassKind } from "../../model";
import { PKTransitType } from "../../Pass/constants";

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

	return <PassLayout {...props} />;
}

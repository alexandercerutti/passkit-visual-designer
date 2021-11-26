import * as React from "react";
import { Pass } from "@pkvd/passkit-types";
import { PKPassLayout, PassMixedProps, PassKind } from "@pkvd/PKPass";
import useAlternativesRegistration from "../useAlternativesRegistration";

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
				transitType: Pass.PKTransitType.Generic,
			},
		},
		{
			name: "Air Boarding Pass",
			specificProps: {
				transitType: Pass.PKTransitType.Air,
			},
		},
		{
			name: "Boat Boarding Pass",
			specificProps: {
				transitType: Pass.PKTransitType.Boat,
			},
		},
		{
			name: "Bus Boarding Pass",
			specificProps: {
				transitType: Pass.PKTransitType.Bus,
			},
		},
		{
			name: "Train Boarding Pass",
			specificProps: {
				transitType: Pass.PKTransitType.Train,
			},
		}
	);

	return <PKPassLayout.BoardingPass {...props} />;
}

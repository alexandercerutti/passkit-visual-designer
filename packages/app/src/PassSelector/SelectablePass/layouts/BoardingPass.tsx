import * as React from "react";
import { Pass } from "@pkvd/passkit-types";
import { PKPassLayout, PassMixedProps, PassKind } from "@pkvd/pkpass";
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
				boardingPass: {
					transitType: Pass.PKTransitType.Generic,
					headerFields: [],
					auxiliaryFields: [],
					primaryFields: [],
					secondaryFields: [],
					backFields: [],
				},
			},
		},
		{
			name: "Air Boarding Pass",
			specificProps: {
				boardingPass: {
					transitType: Pass.PKTransitType.Air,
					headerFields: [],
					auxiliaryFields: [],
					primaryFields: [],
					secondaryFields: [],
					backFields: [],
				},
			},
		},
		{
			name: "Boat Boarding Pass",
			specificProps: {
				boardingPass: {
					transitType: Pass.PKTransitType.Boat,
					headerFields: [],
					auxiliaryFields: [],
					primaryFields: [],
					secondaryFields: [],
					backFields: [],
				},
			},
		},
		{
			name: "Bus Boarding Pass",
			specificProps: {
				boardingPass: {
					transitType: Pass.PKTransitType.Bus,
					headerFields: [],
					auxiliaryFields: [],
					primaryFields: [],
					secondaryFields: [],
					backFields: [],
				},
			},
		},
		{
			name: "Train Boarding Pass",
			specificProps: {
				boardingPass: {
					transitType: Pass.PKTransitType.Train,
					headerFields: [],
					auxiliaryFields: [],
					primaryFields: [],
					secondaryFields: [],
					backFields: [],
				},
			},
		}
	);

	return <PKPassLayout.BoardingPass {...props} />;
}

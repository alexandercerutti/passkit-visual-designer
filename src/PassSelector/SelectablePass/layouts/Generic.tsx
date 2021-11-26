import * as React from "react";
import { Pass } from "@pkvd/passkit-types";
import { PassKind, PKPassLayout, PassMixedProps } from "@pkvd/PKPass";
import useAlternativesRegistration from "../useAlternativesRegistration";

/**
 * Layout proxy with alternatives registration capability.
 *
 * @param props
 * @returns
 */

export default function Generic(props: PassMixedProps) {
	useAlternativesRegistration(
		PassKind.GENERIC,
		{
			name: "With rectangular barcode",
			specificProps: {
				barcode: {
					format: Pass.PKBarcodeFormat.Rectangle,
				},
			},
		},
		{
			name: "With square barcode",
			specificProps: {
				barcode: {
					format: Pass.PKBarcodeFormat.Square,
				},
			},
		}
	);

	return <PKPassLayout.Generic {...props} />;
}

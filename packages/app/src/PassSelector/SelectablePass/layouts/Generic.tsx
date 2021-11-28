import * as React from "react";
import { Pass } from "@pkvd/passkit-types";
import { PassKind, PKPassLayout, PassMixedProps } from "@pkvd/pkpass";
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
				barcodes: [
					{
						format: Pass.PKBarcodeFormat.Rectangle,
						message: "",
						messageEncoding: "",
					},
				],
			},
		},
		{
			name: "With square barcode",
			specificProps: {
				barcodes: [
					{
						format: Pass.PKBarcodeFormat.Square,
						message: "",
						messageEncoding: "",
					},
				],
			},
		}
	);

	return <PKPassLayout.Generic {...props} />;
}

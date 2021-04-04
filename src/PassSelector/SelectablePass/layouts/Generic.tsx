import * as React from "react";
import useAlternativesRegistration from "../useAlternativesRegistration";
import { Generic as PassLayout } from "../../../Pass/layouts";
import { PassMixedProps } from "../../../Pass";
import { PassKind } from "../../../model";
import { PKBarcodeFormat } from "../../../Pass/constants";

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
					format: PKBarcodeFormat.Rectangle,
				},
			},
		},
		{
			name: "With square barcode",
			specificProps: {
				barcode: {
					format: PKBarcodeFormat.Square,
				},
			},
		}
	);

	return <PassLayout {...props} />;
}

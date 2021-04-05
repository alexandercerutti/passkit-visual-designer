import * as React from "react";
import { Layouts, PassMixedProps, Constants } from "@pkvd/pass";
import useAlternativesRegistration from "../useAlternativesRegistration";
import { PassKind } from "../../../model";

const { PKBarcodeFormat } = Constants;

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

	return <Layouts.Generic {...props} />;
}

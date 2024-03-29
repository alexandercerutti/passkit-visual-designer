import * as React from "react";
import Pass, { Layouts, PassMixedProps } from "@pkvd/pass";
import { PassKind } from "../../model";
import * as SelectableLayouts from "./layouts";

/**
 * This module defines an alternative sets of layouts, which
 * are the same layouts but with additional features just for
 * selection, to keep the main layout component as clean as
 * possible.
 *
 * Also, it allows defining a name for the pass to be showed
 * under it as a description.
 */

export interface SelectablePassProps extends PassMixedProps {
	name: string;
}

const LayoutsMap = new Map<PassKind, Layouts.LayoutSignature>([
	[PassKind.BOARDING_PASS, SelectableLayouts.BoardingPass],
	[PassKind.COUPON, SelectableLayouts.Coupon],
	[PassKind.EVENT, SelectableLayouts.EventTicket],
	[PassKind.GENERIC, SelectableLayouts.Generic],
	[PassKind.STORE, SelectableLayouts.StoreCard],
]);

export default function SelectablePass(props: SelectablePassProps): JSX.Element {
	const { name, ...passProps } = props;

	const PassLayout = LayoutsMap.get(passProps.kind);

	return (
		<>
			<div className="darkness-realm">
				<Pass layout={PassLayout} {...passProps} />
			</div>
			<div className="name">{name}</div>
		</>
	);
}

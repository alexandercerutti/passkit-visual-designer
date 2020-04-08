import * as React from "react";
import "./style.less";
import Pass, { PassCoreProps } from "../../passes/PassCore";
import { PassKind } from "../../model";
import { PKTransitType } from "../../passes/constants";

interface ViewerProps extends PassCoreProps { }

export default function Viewer(props: ViewerProps) {
	return (
		<div className="viewer">
			<Pass
				kind={PassKind.BOARDING_PASS}
				transitType={PKTransitType.Boat}
				{...props} />
		</div>
	);
}

import * as React from "react";
import "./style.less";
import * as Layouts from "./layouts";
import useCSSCustomProperty from "./useCSSCustomProperty";
import { createClassName } from "./utils";
import {
	DEFAULT_BACKGROUND_COLOR,
	DEFAULT_FOREGROUND_COLOR,
	DEFAULT_LABEL_COLOR,
} from "./constants";
import { PassMixedProps } from ".";
import Backfields from "./layouts/sections/BackFields";
import { PassKind } from "./PassKind";
import { Pass } from "@pkvd/passkit-types";

export interface PassProps extends Partial<PassMixedProps> {
	showBack?: boolean;
	layout?: Layouts.LayoutSignature;
}

const PassKindsLayoutsMap = new Map<PassKind, Layouts.LayoutSignature>([
	[PassKind.BOARDING_PASS, Layouts.BoardingPass],
	[PassKind.COUPON, Layouts.Coupon],
	[PassKind.EVENT, Layouts.EventTicket],
	[PassKind.GENERIC, Layouts.Generic],
	[PassKind.STORE, Layouts.StoreCard],
]);

export default function PKPass(props: PassProps) {
	const { kind, backgroundColor, foregroundColor, labelColor, ...newProps } = props;
	const { backFields } = resolvePassKindFromProps(props);
	// We want to keep backgroundImage and others in passes layouts but
	// also exclude the others above and use backgroundImage here to set
	// the Background
	const { backgroundImage } = props;

	const PassLayout = props.layout || PassKindsLayoutsMap.get(kind);

	/**
	 * Setting ref against card and not on main pass element
	 * to avoid an annoying flickering rendering bug in chromium
	 * that happens when using transitions on hover
	 * and css background images through CSS variables.
	 * Browser performs new request every time and rerenders the
	 * element.
	 */

	const cardRef = React.useRef<HTMLDivElement>();
	useCSSCustomProperty(
		cardRef,
		"background",
		backgroundImage || backgroundColor || DEFAULT_BACKGROUND_COLOR
	);
	useCSSCustomProperty(cardRef, "foreground-color", foregroundColor || DEFAULT_FOREGROUND_COLOR);
	useCSSCustomProperty(cardRef, "label-color", labelColor || DEFAULT_LABEL_COLOR);

	/** To avoid blur effect if no background is available */
	const contentClassName = createClassName(["content"], {
		"bg-image": Boolean(backgroundImage),
	});

	const passCardClassName = createClassName(["card"], {
		"show-back": props.showBack,
	});

	return (
		<div className="pass" data-kind={kind}>
			<div className={passCardClassName} ref={cardRef}>
				<div className="decorations" />
				<div className={contentClassName}>
					<PassLayout {...newProps} />
				</div>
				<Backfields data={backFields} />
			</div>
		</div>
	);
}

function resolvePassKindFromProps(
	props: PassProps
): Pass.BoardingPass | Pass.Coupon | Pass.StoreCard | Pass.EventTicket | Pass.Generic {
	const { boardingPass, coupon, eventTicket, storeCard, generic } = props;
	return boardingPass || coupon || eventTicket || storeCard || generic;
}

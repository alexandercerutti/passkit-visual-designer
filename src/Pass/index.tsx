import * as React from "react";
import "./style.less";
import { PassKind } from "../model";
import * as Layouts from "./layouts";
import {
	PKTransitType,
	PassFields,
	WalletPassFormat,
	DEFAULT_BACKGROUND_COLOR,
	DEFAULT_FOREGROUND_COLOR,
	DEFAULT_LABEL_COLOR,
} from "./constants";
import { createClassName } from "../utils";
import Backfields from "./layouts/sections/BackFields";
import useCSSCustomProperty from "./useCSSCustomProperty";

export { default as InteractionContext } from "./InteractionContext";
export * as Layouts from "./layouts";
export * as Constants from "./constants";

export interface PassMixedProps extends PassMediaProps {
	kind?: PassKind;
	headerFields?: PassFields.HeaderFields[];
	secondaryFields?: PassFields.SecondaryFields[];
	primaryFields?: PassFields.PrimaryFields[];
	auxiliaryFields?: PassFields.AuxiliaryFields[];
	backFields?: PassFields.BackFields[];
	barcode?: Partial<WalletPassFormat.Barcodes>; // @TODO check if an array should be used instead
	transitType?: PKTransitType;
	logoText?: string;
	backgroundColor?: string;
	foregroundColor?: string;
	labelColor?: string;
	description?: string;
	passTeamIdentifier?: string;
	serialNumber?: string;
	organizationName?: string;
	passTypeIdentifier?: string;
	teamIdentifier?: string;
	formatVersion?: 1;
	groupingIdentifier?: string;
	webServiceURL?: string;
	authenticationToken?: string;
	associatedStoreIdentifiers?: string;
	appLaunchURL?: string;
}

/**
 * This interface includes urls from redux middleware
 */
export interface PassMediaProps {
	logo?: string;
	backgroundImage?: string;
	thumbnailImage?: string;
	stripImage?: string;
	icon?: string;
	footerImage?: string;
}

export interface PassProps extends PassMixedProps {
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

export default function Pass(props: PassProps) {
	const { kind, backgroundColor, foregroundColor, backFields, labelColor, ...newProps } = props;
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

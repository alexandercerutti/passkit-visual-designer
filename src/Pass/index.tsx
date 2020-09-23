import * as React from "react";
import "./style.less";
import { PassKind } from "../model";
import { BoardingPass } from "./layouts/BoardingPass";
import { Coupon } from "./layouts/Coupon";
import { EventTicket } from "./layouts/EventTicket";
import { Generic } from "./layouts/Generic";
import { StoreCard } from "./layouts/StoreCard";
import { PKTransitType, PassFields, WalletPassFormat, DEFAULT_BACKGROUND_COLOR, DEFAULT_FOREGROUND_COLOR, DEFAULT_LABEL_COLOR } from "./constants";
import { InteractionContextMethods } from "./InteractionContext";
import changeCSSCustomProperty from "./changeCSSCustomProperty";
import { createClassName } from "../utils";
import Backfields from "./layouts/sections/BackFields";

export { default as InteractionContext } from "./InteractionContext";

export interface PassMixedProps {
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

	// URLs from redux middlewares
	logo?: string;
	backgroundImage?: string;
	thumbnailImage?: string;
	stripImage?: string;
	icon?: string;
	footerImage?: string;
}

export type MediaProps = Pick<PassMixedProps, "backgroundImage" | "footerImage" | "logo" | "thumbnailImage" | "stripImage" | "icon">;

export interface PassProps extends PassMixedProps, Partial<InteractionContextMethods> {
	showBack?: boolean;
}

const PassKindsMap = new Map<PassKind, React.FunctionComponent<PassMixedProps>>([
	[PassKind.BOARDING_PASS, BoardingPass],
	[PassKind.COUPON, Coupon],
	[PassKind.EVENT, EventTicket],
	[PassKind.GENERIC, Generic],
	[PassKind.STORE, StoreCard]
]);

export default function Pass(props: PassProps) {
	const { kind, backgroundColor, foregroundColor, backFields, labelColor, ...newProps } = props;
	// We want to keep backgroundImage and others in passes layouts but
	// also exclude the others above and use backgroundImage here to set
	// the Background
	const { backgroundImage } = props;

	const PassComponent = PassKindsMap.get(kind);

	React.useEffect(() => {
		changeCSSCustomProperty("--pass-background", backgroundImage || backgroundColor, DEFAULT_BACKGROUND_COLOR);
		changeCSSCustomProperty("--pass-foreground-color", foregroundColor, DEFAULT_FOREGROUND_COLOR);
		changeCSSCustomProperty("--pass-label-color", labelColor, DEFAULT_LABEL_COLOR);
	}, [backgroundColor, backgroundImage, foregroundColor, labelColor]);

	/** To avoid blur effect if no background is available */
	const contentClassName = createClassName(["content"], {
		"bg-image": Boolean(backgroundImage)
	});

	const passCardClassName = createClassName(["card"], {
		"show-back": props.showBack
	});

	return (
		<div className="pass" data-kind={kind}>
			<div className="decorations"></div>
			<div className={passCardClassName}>
				<div className={contentClassName}>
					<PassComponent {...newProps} />
				</div>
				<Backfields data={backFields} />
			</div>
		</div>
	);
}

import * as React from "react";
import "./style.less";
import { PassKind } from "../model";
import { BoardingPass } from "./layouts/BoardingPass";
import { Coupon } from "./layouts/Coupon";
import { EventTicket } from "./layouts/EventTicket";
import { Generic } from "./layouts/Generic";
import { StoreCard } from "./layouts/StoreCard";
import { PKTransitType, PassFields, WalletPassFormat, DEFAULT_BACKGROUND_COLOR, DEFAULT_FOREGROUND_COLOR, DEFAULT_LABEL_COLOR } from "./constants";
import { InteractionContext } from "./interactionContext";
import useObjectURL from "../useObjectURL";
import changeCSSCustomProperty from "./changeCSSCustomProperty";
import { createClassName } from "../utils";

export { Provider as InteractionProvider, Consumer as InteractionConsumer } from "./interactionContext";

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

	logo?: ArrayBuffer;
	backgroundImage?: ArrayBuffer;
	thumbnailImage?: ArrayBuffer;
	stripImage?: ArrayBuffer;
	appLogo?: ArrayBuffer;
}

export interface PassProps extends PassMixedProps, Partial<InteractionContext> { }

/**
 * Remapping some media
 */
type RemappableProps = "logo" | "backgroundImage" | "thumbnailImage" | "stripImage" | "appLogo";
export type PassPropsRemappedMedia = Partial<Omit<PassMixedProps, RemappableProps> & {
	logo: string;
	backgroundImage: string;
	thumbnailImage: string;
	stripImage: string;
	appLogo: string;
}>;

const PassKindsMap = new Map<PassKind, React.FunctionComponent<PassPropsRemappedMedia>>([
	[PassKind.BOARDING_PASS, BoardingPass],
	[PassKind.COUPON, Coupon],
	[PassKind.EVENT, EventTicket],
	[PassKind.GENERIC, Generic],
	[PassKind.STORE, StoreCard]
]);

export default function Pass(props: PassProps) {
	const { kind, logo, backgroundColor, backgroundImage, foregroundColor, labelColor, stripImage, appLogo, thumbnailImage, ...newProps } = props;
	const PassComponent = PassKindsMap.get(kind);

	const remappedProps: Partial<PassPropsRemappedMedia> = {
		logo: useObjectURL(logo),
		backgroundImage: useObjectURL(backgroundImage),
		stripImage: useObjectURL(stripImage, { type: "image/*" }),
		appLogo: useObjectURL(appLogo),
		thumbnailImage: useObjectURL(thumbnailImage, { type: "image/*" }),
	};

	changeCSSCustomProperty("--pass-background", remappedProps.backgroundImage || backgroundColor, DEFAULT_BACKGROUND_COLOR);
	changeCSSCustomProperty("--pass-foreground-color", foregroundColor, DEFAULT_FOREGROUND_COLOR);
	changeCSSCustomProperty("--pass-label-color", labelColor, DEFAULT_LABEL_COLOR);

	/** To avoid blur effect if no background is available */
	const className = createClassName(["pass"], {
		"bg-image": Boolean(remappedProps.backgroundImage)
	});

	return (
		<div className={className} data-kind={kind}>
			<div className="content">
				<PassComponent {...newProps} {...remappedProps} />
			</div>
		</div>
	);
}

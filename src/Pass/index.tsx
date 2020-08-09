import * as React from "react";
import "./style.less";
import { PassKind } from "../model";
import { BoardingPass } from "./layouts/BoardingPass";
import { Coupon } from "./layouts/Coupon";
import { EventTicket } from "./layouts/EventTicket";
import { Generic } from "./layouts/Generic";
import { StoreCard } from "./layouts/StoreCard";
import { PKTransitType, PassFields, WalletPassFormat } from "./constants";
import { InteractionContext } from "./interactionContext";
import useObjectURL from "../useObjectURL";

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
	const { kind, logo, backgroundImage, stripImage, appLogo, thumbnailImage, ...newProps } = props;
	const PassComponent = PassKindsMap.get(kind);

	const remappedProps: Partial<PassPropsRemappedMedia> = {
		logo: useObjectURL(logo),
		backgroundImage: useObjectURL(backgroundImage),
		stripImage: useObjectURL(stripImage, { type: "image/*" }),
		appLogo: useObjectURL(appLogo),
		thumbnailImage: useObjectURL(thumbnailImage, { type: "image/*" }),
	};

	return (
		<div className="pass" data-kind={kind}>
			<div className="content">
				<PassComponent {...newProps} {...remappedProps} />
			</div>
		</div>
	);
}

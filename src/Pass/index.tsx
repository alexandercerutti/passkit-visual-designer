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

const PassKindsMap = new Map<PassKind, React.FunctionComponent<PassMixedProps>>([
	[PassKind.BOARDING_PASS, BoardingPass],
	[PassKind.COUPON, Coupon],
	[PassKind.EVENT, EventTicket],
	[PassKind.GENERIC, Generic],
	[PassKind.STORE, StoreCard]
]);

export default function Pass(props: PassProps) {
	const { kind, ...newProps } = props;
	const PassComponent = PassKindsMap.get(kind);

	return (
		<div className="pass" data-kind={kind}>
			<div className="content">
				<PassComponent {...newProps} />
			</div>
		</div>
	);
}

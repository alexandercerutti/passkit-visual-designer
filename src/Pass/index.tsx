import * as React from "react";
import "./style.less";
import { PassKind } from "../model";
import { BoardingPass } from "./layouts/BoardingPass";
import { Coupon } from "./layouts/Coupon";
import { EventTicket } from "./layouts/EventTicket";
import { Generic } from "./layouts/Generic";
import { StoreCard } from "./layouts/StoreCard";
import { PassAlternative } from "../PassSelector";
import { PKTransitType, PassFields, WalletPassFormat } from "./constants";
import { InteractionContext } from "./interactionContext";

export { Provider as InteractionProvider, Consumer as InteractionConsumer } from "./interactionContext";

export interface PassMixedProps {
	registerAlternatives?(...alternatives: PassAlternative[]): void;

	headerFields?: PassFields.HeaderFields[];
	secondaryFields?: PassFields.SecondaryFields[];
	primaryFields?: PassFields.PrimaryFields[];
	auxiliaryFields?: PassFields.AuxiliaryFields[];
	backFields?: PassFields.BackFields[];
	barcode?: Partial<WalletPassFormat.Barcodes>; // @TODO check if an array should be used instead
	transitType?: PKTransitType;
	logoText?: string;

	logo?: string;
	backgroundImage?: string;
	thumbnailImage?: string;
	stripImage?: string;
	appLogo?: string;
}

export interface PassCoreProps extends PassMixedProps, Partial<InteractionContext> {
	kind: PassKind;
}

const PassKindsMap = new Map<PassKind, React.FunctionComponent<PassMixedProps>>([
	[PassKind.BOARDING_PASS, BoardingPass],
	[PassKind.COUPON, Coupon],
	[PassKind.EVENT, EventTicket],
	[PassKind.GENERIC, Generic],
	[PassKind.STORE, StoreCard]
]);

export default function Pass(props: PassCoreProps) {
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

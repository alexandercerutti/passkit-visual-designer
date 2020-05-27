import * as React from "react";
import "./style.less";
import { PassKind } from "../../model";
import { BoardingPass } from "../BoardingPass";
import { Coupon } from "../Coupon";
import { EventTicket } from "../EventTicket";
import { Generic } from "../Generic";
import { StoreCard } from "../StoreCard";
import { PassAlternative } from "../../PassSelector";
import { FieldProps } from "../Areas/components/Field";
import { PKBarcodeFormat, PKTransitType } from "../constants";
import { InteractionContext } from "./interactionContext";

export { Provider as InteractionProvider, Consumer as InteractionConsumer } from "./interactionContext";

export interface PassProps {
	registerAlternatives?(...alternatives: PassAlternative[]): void;

	headerFields?: FieldProps[];
	secondaryFields?: FieldProps[];
	primaryFields?: FieldProps[];
	auxiliaryFields?: FieldProps[];
	backFields?: FieldProps[];
	barcode?: {
		message?: string; // @TODO
		format?: PKBarcodeFormat;
		altText?: string; // @TODO
		locked?: boolean; // @TODO
	};
	transitType?: PKTransitType;
	logoText?: string;

	logo?: string;
	backgroundImage?: string;
	thumbnailImage?: string;
	stripImage?: string;
	appLogo?: string;
}

export interface PassCoreProps extends PassProps, Partial<InteractionContext> {
	kind: PassKind;
}

const PassKindsMap = new Map<PassKind, React.FunctionComponent<PassProps>>([
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
		<div className={`pass ${kind.toLowerCase()}`}>
			<div className="content">
				<PassComponent {...newProps} />
			</div>
		</div>
	);
}

import * as React from "react";
import "./style.less";
import { PassKind } from "../../model";
import { BoardingPass } from "../BoardingPass";
import { Coupon } from "../Coupon";
import { EventTicket } from "../EventTicket";
import { Generic } from "../Generic";
import { StoreCard } from "../StoreCard";
import { PassAlternative } from "../../PassSelector";
import { FieldProps } from "../Components/Field";
import { PKBarcodeFormat, PKTransitType } from "../constants";

export { Provider as InteractionProvider, Consumer as InteractionConsumer } from "./interactionContext";

export interface PassProps {
	registerAlternatives?(...alternatives: PassAlternative[]): void;

	secondaryFields?: FieldProps[];
	primaryFields?: FieldProps[];
	headerData?: {
		logoSrc?: string;
		logoText?: string;
		fields?: FieldProps[];
	};
	auxiliaryFields?: FieldProps[];
	backFields?: FieldProps[];
	barcode?: {
		message?: string; // @TODO
		format?: PKBarcodeFormat;
		altText?: string; // @TODO
		locked?: boolean; // @TODO
	};
	transitType?: PKTransitType;
	backgroundImage?: string;
	thumbnailImage?: string;
	stripImage?: string;
	appLogo?: string;
}

export interface PassCoreProps extends PassProps {
	kind: PassKind;
}

type AllPassesTypes = typeof BoardingPass | typeof StoreCard | typeof Coupon | typeof EventTicket | typeof Generic;

export default class Pass extends React.Component<PassCoreProps> {
	constructor(props: PassCoreProps) {
		super(props);
	}

	deriveComponentFromKind(kind: PassKind): AllPassesTypes {
		switch (kind) {
			case PassKind.BOARDING_PASS:
				return BoardingPass
			case PassKind.COUPON:
				return Coupon;
			case PassKind.EVENT:
				return EventTicket;
			case PassKind.GENERIC:
				return Generic;
			case PassKind.STORE:
				return StoreCard;
		}
	}

	render(): JSX.Element {
		const PassComponent = this.deriveComponentFromKind(this.props.kind);
		const newProps = (({ kind, ...otherProps }: PassCoreProps) => ({ ...otherProps }))(this.props);

		console.log(this.props, PassComponent);

		return (
			<div className={`pass ${this.props.kind.toLowerCase()}`}>
				<div className="content">
					<PassComponent {...newProps} />
				</div>
			</div>
		);
	}
}

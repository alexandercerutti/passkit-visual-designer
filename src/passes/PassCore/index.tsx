import * as React from "react";
import "./style.less";
import { PassKind } from "../../model";
import BoardingPass from "../BoardingPass";
import { Coupon } from "../Coupon";
import { EventTicket } from "../EventTicket";
import { Generic } from "../Generic";
import { StoreCard } from "../StoreCard";
import { PassAlternative } from "../../PassSelector";
import { FieldProps } from "../Components/Field";
import { PKBarcodeFormat } from "../constants";

export { Provider as interactionProvider, Consumer as InteractionConsumer } from "./interactionContext";

export interface PassProps {
	kind: PassKind;
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
	}
}

export default class Pass extends React.Component<PassProps> {
	constructor(props: any) {
		super(props);
	}

	deriveComponentFromKind(kind: PassKind): React.ComponentType<PassProps> {
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
		const PassProps = ({ kind, registerAlternatives }: PassProps) => ({ kind, registerAlternatives });

		console.log(this.props, PassComponent);

		return (
			<div className={`pass ${this.props.kind.toLowerCase()}`}>
				<div className="content">
					<PassComponent {...PassProps(this.props)} />
				</div>
			</div>
		);
	}
}

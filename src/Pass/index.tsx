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

	// URLs from redux middlewares
	logo?: string;
	backgroundImage?: string;
	thumbnailImage?: string;
	stripImage?: string;
	appLogo?: string;
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
	const { kind, backgroundColor, foregroundColor, labelColor, ...newProps } = props;
	// We want to keep backgroundImage and others in passes layouts but
	// also exclude the others above and use backgroundImage here to set
	// the Background
	const { backgroundImage } = props;

	const PassComponent = PassKindsMap.get(kind);

	changeCSSCustomProperty("--pass-background", backgroundImage || backgroundColor, DEFAULT_BACKGROUND_COLOR);
	changeCSSCustomProperty("--pass-foreground-color", foregroundColor, DEFAULT_FOREGROUND_COLOR);
	changeCSSCustomProperty("--pass-label-color", labelColor, DEFAULT_LABEL_COLOR);

	/** To avoid blur effect if no background is available */
	const className = createClassName(["pass"], {
		"bg-image": Boolean(backgroundImage)
	});

	return (
		<div className={className} data-kind={kind}>
			<div className="content">
				<PassComponent {...newProps} />
			</div>
		</div>
	);
}

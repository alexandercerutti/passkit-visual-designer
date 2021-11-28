import { Pass } from "@pkvd/passkit-types";
import { PassKind } from "./PassKind";

export { default as PKPassElement } from "./Pass";
export type { PassProps } from "./Pass";
export { PassKind } from "./PassKind";
export * as PKPassLayout from "./layouts";
export { default as InteractionContext } from "./InteractionContext";

// @TODO convert to Pass namespace
export interface PassMixedProps extends PassMediaProps, Pass {
	kind?: PassKind;
	/* 	transitType?: Pass.PKTransitType;*/
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

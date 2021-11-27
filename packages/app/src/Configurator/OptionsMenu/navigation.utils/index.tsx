import { PassMixedProps } from "@pkvd/pkpass";

export { default as navigable } from "./navigable.hoc";
export { default as usePageRelation } from "./usePageRelation.hook";
export { default as usePagesAmount } from "./usePagesAmount.hook";

export type { NavigableProps } from "./navigable.hoc";
export interface PageProps {
	name: string | keyof PassMixedProps;
	onBack: Function;
}

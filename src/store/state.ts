import { PassKind } from "../model";
import { PassProps } from "../passes/PassCore";

export interface State {
	selectedPass: {
		kind: PassKind;
		props: PassProps;
	},
	passContent: PassProps & {
		background?: any;
		strip?: any;
		thumbnail?: any;
		logo?: any;
		icon?: any;
	}
}

export const initialState: State = {
	selectedPass: {
		kind: null,
		props: null,
	},
	passContent: null
}

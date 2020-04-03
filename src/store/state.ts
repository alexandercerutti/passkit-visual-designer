import { PassKind } from "../model";
import { PassProps } from "../passes/PassCore";

export interface State {
	selectedPass: {
		kind: PassKind;
		props: PassProps;
	}
}

export const initialState: State = {
	selectedPass: {
		kind: null,
		props: null,
	}
}

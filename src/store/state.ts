import { PassMixedProps } from "../Pass";

export interface State {
	pass: Partial<PassMixedProps>,
	media: {

	}
}

export const initialState: State = {
	pass: {},
	media: {}
}

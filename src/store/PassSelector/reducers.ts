import { State, initialState } from "../state";
import { PSActionTypes, SelectionAction } from "./actions";

export default function selectedPass(state = initialState.selectedPass, action: SelectionAction): State["selectedPass"] {
	switch (action.type) {
		case PSActionTypes.SET_PASS_KIND: {
			return {
				kind: action.kind,
				props: null,
			}
		}
		case PSActionTypes.SET_PROPS: {
			return {
				...state,
				props: action.props
			}
		}

		default: {
			return state;
		}
	}
}

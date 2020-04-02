import { State, initialState } from "../state";
import { PSActionTypes, SelectionAction } from "./actions";

export default function selectedPass(state = initialState.selectedPass, action: SelectionAction): State["selectedPass"] {
	switch (action.type) {
		case PSActionTypes.SELECT_KIND: {
			return {
				selectedKind: action.pass,
				selectedAlternative: null,
			}
		}
		case PSActionTypes.SELECT_ALTERNATIVE: {
			return {
				...state,
				selectedAlternative: null
			}
		}

		default: {
			return state;
		}
	}
}

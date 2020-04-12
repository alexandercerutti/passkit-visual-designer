import { State, initialState } from "../state";
import { ConfigActions, ConfiguratorAction } from "./actions";

export default function passContent(state = initialState.passContent, action: ConfiguratorAction): State["passContent"] {
	switch (action.type) {
		case ConfigActions.CHANGE_VALUE: {
			return {
				...state,
				[action.key]: action.value
			}
		}

		default: {
			return state;
		}
	}
}

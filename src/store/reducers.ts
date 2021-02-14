import { AnyAction, CombinedState, combineReducers } from "redux";
import { State } from ".";
import pass from "./pass";
import media from "./media";
import projectOptions from "./projectOptions";
import translations from "./translations";
import * as forage from "./forage";

const applicationReducers = combineReducers<State>({
	pass,
	media,
	projectOptions,
	translations,
});

export default function (state: CombinedState<State>, action: AnyAction) {
	if (action.type === forage.RESET) {
		// Making reducers to fallback to their initial state
		return applicationReducers(undefined, action);
	}

	if (action.type === forage.INIT) {
		const { snapshot } = action as forage.Actions.Init;
		return applicationReducers(snapshot, action);
	}

	return applicationReducers(state, action);
}

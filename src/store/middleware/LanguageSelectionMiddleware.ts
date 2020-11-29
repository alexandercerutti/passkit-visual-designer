import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ConfigActions, createMediaSet, destroyMediaSet, MediaSetCreateAction, MediaSetDestroyAction, ProjectOptionSetAction } from "../actions";
import { MediaSet, State } from "../state";

/**
 * This middleware handles the case where a language is
 * selected. In this case, it gets initialized and, if unused,
 * the previous gets pruned.
 *
 * @param store
 */

export default function LanguageSelectionMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: ThunkDispatch<State, any, AnyAction>) => (action: ProjectOptionSetAction) => {
		if (action.type !== ConfigActions.SET_PROJECT_OPT || action.key !== "activeMediaLanguage") {
			return next(action);
		}

		const thunks: (MediaSetDestroyAction | MediaSetCreateAction | ProjectOptionSetAction)[] = [
			action
		];

		const state = store.getState();
		const { media, projectOptions: { activeMediaLanguage } } = state;

		if (!(action.key in media)) {
			/** We have to create an empty media object */
			thunks.push(createMediaSet(action.value));
		}

		if (!Object.keys(media[activeMediaLanguage]).length) {
			/** Current active media language have no media setted in it. Deleting */
			thunks.push(destroyMediaSet(activeMediaLanguage));
		}

		return next((dispatch) => thunks.forEach(dispatch));
	}
}

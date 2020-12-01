import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import { ThunkDispatch } from "redux-thunk";
import type { State } from "..";
import * as Store from "..";

/**
 * This Middleware handles the case in which a media language is selected but
 * it has no content.
 *
 * To avoid initializing it uselessly, we initialize it on-demand, when the user
 * achieves its first operation on it (first on media for MediaSets).
 *
 * @param store
 */

export default function LanguageOperationsEnsureExistingMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: ThunkDispatch<State, any, AnyAction>) => (action: Store.Media.Actions.EditCollection) => {
		if (action.type !== Store.Media.EDIT_COLLECTION) {
			return next(action);
		}

		const state = store.getState();
		const { projectOptions: { activeMediaLanguage }, media } = state;

		if (!media[activeMediaLanguage]?.[action.mediaName]) {
			/** Initializing the media before going on with the main middlewares chain*/
			next(Store.Media.Init(action.mediaName, activeMediaLanguage));
		}

		return next(action);
	}
}

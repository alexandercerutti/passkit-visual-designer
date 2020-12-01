import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import { ThunkDispatch } from "redux-thunk";
import type { State } from "..";
import * as Store from "..";

/**
 * This Middleware handles the case in which a media language is selected but
 * it has no content.
 *
 * Since the media creation is performed by another Middleware
 * and the current media opened is not available in the store,
 * when a media is created, we cannot initialize it. Therefore we need
 * to initialize it on-demand (as soon the user accomplish the first operation).
 *
 * Also media creation might happen in another context, for example
 * when there is no open media (for example, translations)
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

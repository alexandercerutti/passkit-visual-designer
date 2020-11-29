import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { ConfigActions, initMedia, MediaCollectionAction } from "../actions";
import { State } from "../state";

/**
 * This Middleware handles the case in which a media language is selected but
 * it has no content.
 *
 * To avoid initializing it uselessly, we initialize it on-demand, when the user
 * achieves its first operation on it (first on media for MediaSets).
 *
 * @param store
 */


// Se mi arriva un'azione di editing su una collezione, allora inizializzo la lingua.
// Inoltro quindi l'azione.
// Inizializzare la lingua significa che devo sparare una nuova azione.

export function LanguageOperationsEnsureExistingMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: ThunkDispatch<State, any, AnyAction>) => (action: MediaCollectionAction) => {
		if (action.type !== ConfigActions.EDIT_COLLECTION) {
			return next(action);
		}

		const state = store.getState();
		const { projectOptions: { activeMediaLanguage }, media } = state;

		if (!media[activeMediaLanguage]?.[action.mediaName]) {
			/** Initializing the media before going on with the main middlewares chain*/
			next(initMedia(action.mediaName, activeMediaLanguage));
		}

		return next(action);
	}
}

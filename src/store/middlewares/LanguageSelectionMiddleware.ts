import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import { ThunkDispatch } from "redux-thunk";
import type { State } from "..";
import * as Store from "..";

/**
 * This middleware handles the case where a language is
 * selected. In this case, it gets initialized and, if unused,
 * the previous gets pruned.
 *
 * @param store
 */

export default function LanguageSelectionMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: ThunkDispatch<State, any, AnyAction>) => (action: Store.Options.Actions.Set) => {
		if (action.type !== Store.Options.SET_OPTION || action.key !== "activeMediaLanguage") {
			return next(action);
		}

		type Thunks =
			| Store.Media.Actions.Destroy
			| Store.Media.Actions.Create
			| Store.Options.Actions.Set;

		const thunks: Thunks[] = [
			action
		];

		const state = store.getState();
		const { media, projectOptions: { activeMediaLanguage } } = state;

		if (!(action.key in media)) {
			/** We have to create an empty media object */
			thunks.push(Store.Media.Create(action.value));
		}

		const shouldDestroyCurrentMediaSet = (
			Object.entries(media[activeMediaLanguage])
				.every(([_, mediaSet]) => !Object.keys(mediaSet.collections).length)
		);

		if (shouldDestroyCurrentMediaSet) {
			/** Current active media language have no media setted in it. Deleting */
			thunks.push(Store.Media.Destroy(activeMediaLanguage));
		}

		return next((dispatch) => thunks.forEach(dispatch));
	}
}

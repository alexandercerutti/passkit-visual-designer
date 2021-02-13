import { MiddlewareAPI, AnyAction, Dispatch } from "redux";
import { State } from "..";
import * as Store from "..";

type AllowedActions =
	| Store.Media.Actions.EditCollection
	| Store.Translations.Actions.Add

export default function CreationMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: Dispatch<AnyAction>) => (action: AllowedActions) => {
		let { media, translations } = store.getState();

		if (action.type === Store.Media.EDIT_COLLECTION) {
			if (!(action.mediaLanguage in media)) {
				store.dispatch(Store.Media.Create(action.mediaLanguage));
				media = store.getState().media;
			}

			if (!(action.mediaName in media[action.mediaLanguage])) {
				store.dispatch(Store.Media.Init(action.mediaName, action.mediaLanguage));
			}
		} else if (action.type === Store.Translations.ADD) {
			if (!(action.translationLanguage in translations)) {
				store.dispatch(Store.Translations.Init(action.translationLanguage));
				translations = store.getState().translations;
			}
		}

		return next(action);
	}
}

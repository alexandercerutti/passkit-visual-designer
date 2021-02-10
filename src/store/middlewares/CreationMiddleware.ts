import { MiddlewareAPI, AnyAction, Dispatch } from "redux";
import { State } from "..";
import * as Store from "..";

type AllowedActions =
	| Store.Media.Actions.EditCollection
	| Store.Translations.Actions.Add

export default function CreationMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: Dispatch<AnyAction>) => (action: AllowedActions) => {
		let { media, translations, projectOptions: { activeMediaLanguage } } = store.getState();

		if (action.type === Store.Media.EDIT_COLLECTION) {
			if (!(activeMediaLanguage in media)) {
				store.dispatch(Store.Media.Create(activeMediaLanguage));
				media = store.getState().media;
			}

			if (!(action.mediaName in media[activeMediaLanguage])) {
				store.dispatch(Store.Media.Init(action.mediaName, activeMediaLanguage));
			}
		} else if (action.type === Store.Translations.ADD) {
			if (!(activeMediaLanguage in translations)) {
				store.dispatch(Store.Translations.Init(activeMediaLanguage));
				translations = store.getState().translations;
			}
		}

		return next(action);
	}
}

import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import localForage from "localforage";
import { State } from "../store";
import * as Store from "..";

import MediaActions = Store.Media.Actions;
import TranslActions = Store.Translations.Actions;

type SupportedActions =
	| Store.Options.Actions.Set
	| Store.Pass.Actions.SetProp
	| MediaActions.Create
	| MediaActions.Edit
	| MediaActions.Init
	| MediaActions.EditCollection
	| MediaActions.SetActiveCollection
	| MediaActions.SetExportState
	| MediaActions.Destroy
	| TranslActions.Add
	| TranslActions.Destroy
	| TranslActions.Edit
	| TranslActions.Init
	| TranslActions.Remove
	| TranslActions.SetExportState;

export default function LocalForageSaveMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: Dispatch<AnyAction>) => async (action: SupportedActions) => {
		// Unblocking now the middleware chain. We are performing only side-effects now.
		next(action);

		// We should now have the updated infos
		const state = store.getState();
		const { projectOptions: { id } } = state;

		if (!id) {
			// Project has not been initialized yet.
			// We don't want to perform any action on localForage
			return;
		}

		const projects = await localForage.getItem<Store.Forage.ForageStructure["projects"]>("projects");

		const currentProjectContent = projects?.[id] ?? { preview: null, snapshot: null };

		currentProjectContent.snapshot = { ...state };

		await localForage.setItem<Store.Forage.ForageStructure["projects"]>("projects", {
			...projects,
			[id]: currentProjectContent,
		});
	};
}

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
		const currentProjectName = store.getState().projectOptions.title ?? "current";
		// Unblocking now the middleware chain. We are performing only side-effects now.
		next(action);

		// We should now have the updated infos
		const state = store.getState();
		const { projectOptions: { title } } = state;
		const { preview: currentPreview } = await localForage.getItem<Store.Forage.ForageStructure>(currentProjectName);

		if (title && action.type === Store.Options.SET_OPTION && action.key === "title") {
			// Removing old key for the new
			localForage.removeItem(currentProjectName);
		}

		await localForage.setItem<Store.Forage.ForageStructure>(title, {
			preview: currentPreview,
			snapshot: {
				...state
			}
		});
	};
}

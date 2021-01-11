import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import localForage from "localforage";
import html2canvas from "html2canvas";
import { State } from "../store";
import { getArrayBuffer } from "../../utils";
import * as Store from "..";

import MediaActions = Store.Media.Actions;
import TranslActions = Store.Translations.Actions;

type PossibleActions =
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
	return (next: Dispatch<AnyAction>) => async (action: PossibleActions) => {
		// Unblocking now the middleware chain. We are performing only side-effects now.
		next(action);

		const isUnsupportedAction = (
			action.type === Store.Media.INIT ||
			action.type === Store.Media.CREATE ||
			action.type === Store.Media.DESTROY ||
			action.type === Store.Translations.INIT ||
			action.type === Store.Translations.DESTROY
		);

		if (isUnsupportedAction) {
			return;
		}

		// We should now have the updated infos
		// after all the others middlewares and thunks
		const state = store.getState();
		const { projectOptions: { id, title }, pass, translations, media } = state;

		const isProjectInitialized = Boolean(
			id && (
				title ||
				Object.values(pass).some(Boolean) ||
				Object.values(translations).some(set => Object.keys(set.translations).length) ||
				Object.values(media).some(medias => Object.keys(medias).length)
			)
		);

		if (!isProjectInitialized) {
			// Project has not been initialized yet.
			// We don't want to perform any action on localForage
			return;
		}

		const projects = await localForage.getItem<Store.Forage.ForageStructure["projects"]>("projects");

		const currentProjectContent = projects?.[id] ?? { preview: null, snapshot: null };

		/**
		 * We want to save a snapshot of the current state
		 * without the blob URLs we save in the state when
		 * a media is uploaded.
		 *
		 * To achieve this, we have to deep-copy the
		 * state to avoid editing by mistake the current
		 * state.
		 */

		const savedAtTimestamp = Date.now();

		const stateWithoutBlobURLs: State = {
			...state,
			media: deepClone(state["media"]) as State["media"],
			projectOptions: {
				...state.projectOptions,
				savedAtTimestamp,
			}
		};

		for (const lang in stateWithoutBlobURLs["media"]) {
			for (const mediaName in stateWithoutBlobURLs["media"][lang]) {
				for (const collectionID in stateWithoutBlobURLs["media"][lang][mediaName]["collections"]) {
					for (const resolutionID in stateWithoutBlobURLs["media"][lang][mediaName]["collections"][collectionID]["resolutions"]) {
						const { content } = stateWithoutBlobURLs["media"][lang][mediaName]["collections"][collectionID]["resolutions"][resolutionID];

						stateWithoutBlobURLs["media"][lang][mediaName]["collections"][collectionID]["resolutions"][resolutionID].content = [content[0]];
					}
				}
			}
		}

		currentProjectContent.snapshot = stateWithoutBlobURLs;
		const passElement = document.querySelector<HTMLElement>(".viewer > .pass .content");

		const canvasElement = await html2canvas(passElement, {
			windowWidth: 230,
			windowHeight: 370,
			backgroundColor: null,
			logging: false,
			x: 0,
			y: 0
		});

		const blob = await new Promise<Blob>(resolve => canvasElement.toBlob(resolve, "image/*", 1));
		currentProjectContent.preview = await getArrayBuffer(blob);

		await localForage.setItem<Store.Forage.ForageStructure["projects"]>("projects", {
			...projects,
			[id]: currentProjectContent,
		});

		next(Store.Options.Set("savedAtTimestamp", savedAtTimestamp));
	};
}

function deepClone(startingPoint: Object) {
	const finalObject = { ...startingPoint };

	for (const key in startingPoint) {
		if (startingPoint[key] && typeof startingPoint[key] === "object" && !(startingPoint[key] instanceof ArrayBuffer)) {
			if (startingPoint[key] instanceof Array) {
				finalObject[key] = Object.values(deepClone(startingPoint[key]));
			} else {
				finalObject[key] = deepClone(startingPoint[key]);
			}
		} else {
			finalObject[key] = startingPoint[key];
		}
	}

	return finalObject;
}

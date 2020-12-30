import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import localForage from "localforage";
import html2canvas from "html2canvas";
import { State } from "../store";
import { getArrayBuffer } from "../../utils";
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

		const stateWithoutBlobURLs = {
			...state,
			media: { ...state.media }
		};

		for (const [lang, _mediaSet] of Object.entries(stateWithoutBlobURLs["media"])) {
			/** shortcutting the ref to the new copy */
			const mediaSet = (
				stateWithoutBlobURLs["media"][lang] = { ..._mediaSet }
			);

			for (const [media, _mediaObj] of Object.entries(mediaSet)) {
				const mediaObj = (
					mediaSet[media] = { ..._mediaObj }
				);

				for (const [collectionID, _collection] of Object.entries(mediaObj.collections)) {
					const collection = (
						mediaObj["collections"][collectionID] = { ..._collection }
					);

					for (const [resolutionID, _resolution] of Object.entries(collection.resolutions)) {
						const resolution = (
							collection["resolutions"][resolutionID] = { ..._resolution }
						);

						/** Removing URL by creating a whole new object with only the ArrayBuffer */
						resolution.content = [resolution.content[0]];
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
	};
}

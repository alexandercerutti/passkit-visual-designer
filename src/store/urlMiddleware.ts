import { IdentifiedResolutions, MediaCollection, State } from "./state";
import { Dispatch, AnyAction, MiddlewareAPI } from "redux";
import { CollectionEditActionName, CollectionEditActionResolutions, ConfigActions, MediaCollectionAction, MediaEditAction } from "./actions";

export default function URLMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: Dispatch<AnyAction>) => (action: MediaCollectionAction) => {
		if (action.type !== ConfigActions.EDIT_COLLECTION) {
			return next(action);
		}

		const currentStore = store.getState();
		const { projectOptions: { activeMediaLanguage }, media } = currentStore;
		const selectedMedia = media[activeMediaLanguage][action.mediaName];
		/** url string array */
		const resolutionsURLRevokationQueue: string[] = [];
		/** the resolution id to which the url has to be associated and the buffer source */
		const resolutionsURLCreationQueue: [string, ArrayBuffer][] = [];

		let finalCollection: MediaCollection = {
			name: undefined,
			resolutions: {},
		};

		if (action.collection === null) {
			/**
			 * We have to destroy the URLs of this collections
			 * because the collection has been removed
			 */
			const storeCollection = selectedMedia[action.collectionID];
			const resolutions = storeCollection.resolutions;

			for (const resolutionID in resolutions) {
				if (resolutions[resolutionID].content.length === 2) {
					resolutionsURLRevokationQueue.push(resolutions[resolutionID].content[1]);
				}
			}

			finalCollection = undefined;
		} else if (selectedMedia[action.collectionID]) {
			/**
			 * Collection has been edited somehow. We have to discover it.
			 * We get a "hint" from the action itself.
			 */

			/**
			 * (0b0001, 0b0010, 0b0011) & 0b0001 => (1, 0, 1)
			 */
			if (action.editHints & CollectionEditActionName) {
				finalCollection.name = action.collection.name;
			} else {
				finalCollection.name = selectedMedia[action.collectionID].name;
			}

			/**
			 * (0b0001, 0b0010, 0b0011) & 0b0010 => (0, 2, 2)
			 */
			if (action.editHints & CollectionEditActionResolutions) {
				const storeCollectionResolutions = selectedMedia[action.collectionID].resolutions;
				const actionCollectionResolutions = action.collection.resolutions;

				/** Removing duplicates */

				const allResolutionsIDs = new Set([
					...Object.keys(storeCollectionResolutions),
					...Object.keys(actionCollectionResolutions)
				]);

				for (const resolutionID of allResolutionsIDs) {
					const actionResolution = actionCollectionResolutions[resolutionID];
					const storeResolution = storeCollectionResolutions[resolutionID];

					if (actionResolution && storeResolution) {
						if (actionResolution.content[0] !== storeResolution.content[0]) {
							/** buffers are different, old url has to be destroyed, and the new created */
							resolutionsURLRevokationQueue.push(storeResolution.content[1]);
							resolutionsURLCreationQueue.push([resolutionID, actionResolution.content[0]]);
						} else {
							/** Nothing changed. Use store resolution values */
							finalCollection.resolutions[resolutionID] = storeResolution;
						}
					} else if (!actionResolution && storeResolution) {
						/** Resolution has been removed by action */
						resolutionsURLRevokationQueue.push(storeResolution.content[1]);
					} else {
						/** Resolution has been added by action */
						resolutionsURLCreationQueue.push([resolutionID, actionResolution.content[0]]);
					}
				}
			} else {
				finalCollection.resolutions = selectedMedia[action.collectionID].resolutions;
			}
		} else {
			/**
			 * The collection edited is new. If it has resolutions,
			 * we parse them and enqueue them to create the URL
			 */

			const paramResolutions = action.collection.resolutions || {};

			for (const resolutionID in paramResolutions) {
				resolutionsURLCreationQueue.push([resolutionID, paramResolutions[resolutionID].content[0]]);
			}
		}

		resolutionsURLRevokationQueue.forEach(URL.revokeObjectURL);

		for (const [id, buffer] of resolutionsURLCreationQueue) {
			const bufferURL = URL.createObjectURL(new Blob([buffer], { type: "image/*" }));

			if (!finalCollection.resolutions[id]) {
				finalCollection.resolutions[id] = {} as Partial<IdentifiedResolutions>[0];
			}

			finalCollection.resolutions[id].name = "";
			finalCollection.resolutions[id].content = [buffer, bufferURL];
		}

		return next<MediaEditAction>({
			type: ConfigActions.EDIT_MEDIA,
			collections: {
				...selectedMedia,
				[action.collectionID]: finalCollection,
			},
			mediaLanguage: activeMediaLanguage,
			mediaName: action.mediaName
		});
	}
}

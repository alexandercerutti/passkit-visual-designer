import { CollectionSet, MediaCollection, State } from "../state";
import { Dispatch, AnyAction, MiddlewareAPI } from "redux";
import { ConfigActions, MediaCollectionAction, MediaEditAction } from "../actions";

/**
 * This middleware receives a collection being added, edited or deleted
 * and handles its resolutions.
 *
 * On adding, picks every resolution's buffer and creates a URI for it.
 *
 * On modification, compares collection in action and in store and their
 * resolutions.
 * 	- If a resolution is added, it creates URLs for them.
 * 	- If a resolution has different buffer, it destroys the old URL and
 * 	  creates a new one.
 *
 * On collection deletion, iterates the collection in store and destroys
 * every resolution's URL.
 *
 * @param store
 */

export default function CollectionEditUrlMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: Dispatch<AnyAction>) => (action: MediaCollectionAction) => {
		if (action.type !== ConfigActions.EDIT_COLLECTION) {
			return next(action);
		}

		const currentStore = store.getState();
		const { projectOptions: { activeMediaLanguage }, media } = currentStore;
		const selectedMedia = media[activeMediaLanguage][action.mediaName] ?? {} as CollectionSet;
		/** url string array */
		const resolutionsURLRevokationQueue: string[] = [];
		const resolutionsURLCreationQueue: [resolutionID: string, buffer: ArrayBuffer][] = [];

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
		} else if (selectedMedia.collections[action.collectionID]) {
			/**
			 * Collection has been edited somehow. We have to discover it.
			 */

			const storeCollectionResolutions = selectedMedia.collections[action.collectionID].resolutions;
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
						/**
						 * Buffer didn't change. But name might have changed.
						 * Use action resolution values
						 */
						finalCollection.resolutions[resolutionID] = actionResolution;
					}
				} else if (!actionResolution && storeResolution) {
					/** Resolution has been removed by action */
					resolutionsURLRevokationQueue.push(storeResolution.content[1]);
				} else {
					/** Resolution has been added by action */
					resolutionsURLCreationQueue.push([resolutionID, actionResolution.content[0]]);
				}
			}

			finalCollection.name = action.collection.name;
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

			finalCollection.resolutions[id] = {
				name: "",
				content: [buffer, bufferURL],
			};
		}

		return next<MediaEditAction>({
			type: ConfigActions.EDIT_MEDIA,
			collections: {
				...selectedMedia.collections,
				[action.collectionID]: finalCollection,
			},
			mediaLanguage: activeMediaLanguage,
			mediaName: action.mediaName
		});
	}
}

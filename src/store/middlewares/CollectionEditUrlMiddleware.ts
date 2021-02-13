import { Dispatch, AnyAction, MiddlewareAPI } from "redux";
import type { CollectionSet, MediaCollection, State } from "..";
import * as Store from "..";

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
	return (next: Dispatch<AnyAction>) => (action: Store.Media.Actions.EditCollection) => {
		if (action.type !== Store.Media.EDIT_COLLECTION) {
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
			const storeCollection = selectedMedia.collections[action.collectionID];
			const resolutions = storeCollection.resolutions;

			for (const resolutionID in resolutions) {
				const blobUrl = sessionStorage.getItem(resolutionID);

				if (blobUrl) {
					resolutionsURLRevokationQueue.push(blobUrl);
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
				// expecting currentBlobUrl to be null only if final else matches
				const currentBlobUrl = sessionStorage.getItem(resolutionID);
				const actionResolution = actionCollectionResolutions[resolutionID];
				const storeResolution = storeCollectionResolutions[resolutionID];

				if (actionResolution && storeResolution) {
					if (actionResolution.content !== storeResolution.content) {
						/** buffers are different, old url has to be destroyed, and the new created */
						resolutionsURLRevokationQueue.push(currentBlobUrl);
						resolutionsURLCreationQueue.push([resolutionID, actionResolution.content]);
					} else {
						/**
						 * Buffer didn't change. But name might have changed.
						 * Use action resolution values
						 */
						finalCollection.resolutions[resolutionID] = actionResolution;
					}
				} else if (!actionResolution && storeResolution) {
					/** Resolution has been removed by action */
					resolutionsURLRevokationQueue.push(currentBlobUrl);
				} else {
					/** Resolution has been added by action */
					resolutionsURLCreationQueue.push([resolutionID, actionResolution.content]);
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
				resolutionsURLCreationQueue.push([resolutionID, paramResolutions[resolutionID].content]);
			}
		}

		resolutionsURLRevokationQueue.forEach(URL.revokeObjectURL);

		for (const [id, buffer] of resolutionsURLCreationQueue) {
			const bufferURL = URL.createObjectURL(new Blob([buffer], { type: "image/*" }));
			sessionStorage.setItem(id, bufferURL);

			finalCollection.resolutions[id] = {
				name: "",
				content: buffer,
			};
		}

		return next(
			Store.Media.EditCollection(
				action.mediaName,
				action.mediaLanguage,
				action.collectionID,
				finalCollection
			)
		);
	}
}

import { Dispatch, AnyAction, MiddlewareAPI } from "redux";
import type { CollectionSet, MediaCollection, State } from "..";
import * as Store from "..";

/**
 * This middleware receives a collection being added, edited or deleted
 * and handles its resolutions.
 *
 * On adding, picks every resolution's buffer and creates a URI for it
 * and saves it to sessionStorage.
 *
 * On modification, compares collection in action and in store and their
 * resolutions.
 * 	- If a resolution is added, it creates URLs for them and saves them
 * 	  to sessionStorage.
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
		const { media } = currentStore;
		const selectedMedia = media[action.mediaLanguage][action.mediaName];
		/** url string array */
		const resolutionsURLRevokationQueue: [resolutionID: string, url: string][] = [];
		const resolutionsURLCreationQueue: [resolutionID: string, buffer: ArrayBuffer][] = [];

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
					resolutionsURLRevokationQueue.push([resolutionID, blobUrl]);
				}
			}
		} else if (selectedMedia.collections[action.collectionID]) {
			/**
			 * Collection has been edited somehow. We have to discover it.
			 * If the edit concerns resolutions, we'll have to destroy old
			 * references and create new if needed
			 */

			const storeCollectionResolutions = selectedMedia.collections[action.collectionID].resolutions;
			const actionCollectionResolutions = action.collection.resolutions;

			/** Removing duplicates */
			const allResolutionsIDs = new Set([
				...Object.keys(storeCollectionResolutions),
				...Object.keys(actionCollectionResolutions),
			]);

			for (const resolutionID of allResolutionsIDs) {
				const currentBlobUrl = sessionStorage.getItem(resolutionID);
				const actionResolution = actionCollectionResolutions[resolutionID];
				const storeResolution = storeCollectionResolutions[resolutionID];

				if (actionResolution && storeResolution) {
					if (!currentBlobUrl) {
						/**
						 * Buffer doesn't have a blob and url associated, probably
						 * due to initialization. Creating.
						 */

						resolutionsURLCreationQueue.push([resolutionID, actionResolution.content]);
					} else if (actionResolution.content !== storeResolution.content || !currentBlobUrl) {
						/**
						 * Buffers are different, old url has to be destroyed, and the new created
						 */
						resolutionsURLRevokationQueue.push([resolutionID, currentBlobUrl]);
						resolutionsURLCreationQueue.push([resolutionID, actionResolution.content]);
					}
				} else if (!actionResolution && storeResolution) {
					/** Resolution has been removed by action */
					resolutionsURLRevokationQueue.push([resolutionID, currentBlobUrl]);
				} else {
					/** Resolution has been added by action */
					resolutionsURLCreationQueue.push([resolutionID, actionResolution.content]);
				}
			}
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

		for (const [id, url] of resolutionsURLRevokationQueue) {
			sessionStorage.removeItem(id);
			URL.revokeObjectURL(url);
		}

		for (const [id, buffer] of resolutionsURLCreationQueue) {
			const bufferURL = URL.createObjectURL(new Blob([buffer], { type: "image/*" }));
			sessionStorage.setItem(id, bufferURL);
		}

		return next(action);
	};
}

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
		const resolutionsURLToBeDestroyed: string[] = [];
		const resolutionsToBeCreated: [string, ArrayBuffer][] = [];

		let finalCollection: MediaCollection = {
			name: selectedMedia[action.collectionID]?.name,
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
					resolutionsURLToBeDestroyed.push(resolutions[resolutionID].content[1]);
				}
			}

			finalCollection = null;
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
			}

			/**
			 * (0b0001, 0b0010, 0b0011) & 0b0010 => (0, 2, 2)
			 */
			if (action.editHints & CollectionEditActionResolutions) {
				const storeCollectionAllResolutions = selectedMedia[action.collectionID].resolutions;
				const paramsCollectionAllResolutions = action.collection.resolutions;

				/** Removing duplicates */

				const allResolutionsIDs = new Set([
					...Object.keys(storeCollectionAllResolutions),
					...Object.keys(paramsCollectionAllResolutions)
				]);

				for (const resolutionID of allResolutionsIDs) {
					const paramResolutionDetail = paramsCollectionAllResolutions[resolutionID].content;
					const storeResolutionDetail = storeCollectionAllResolutions[resolutionID].content;

					if (paramsCollectionAllResolutions[resolutionID] === null) {
						if (storeResolutionDetail.length === 2) {
							resolutionsURLToBeDestroyed.push(storeResolutionDetail[1]);
						}
					} else if (storeCollectionAllResolutions[resolutionID]) {
						if (storeResolutionDetail[0] !== paramResolutionDetail[0]) {
							/**
							 * Resolution ArrayBuffer is different. If we have an URL,
							 * we remove it and create it again
							 */
							if (storeResolutionDetail[1]) {
								resolutionsURLToBeDestroyed.push(storeResolutionDetail[1]);
							}

							resolutionsToBeCreated.push([resolutionID, paramResolutionDetail[0]]);
						}

						/** Weather it changed or not, we use the resolutionID */
						finalCollection.resolutions[resolutionID] = paramsCollectionAllResolutions[resolutionID];
					} else {
						// Adding the array buffer to list of urls to be created
						resolutionsToBeCreated.push([resolutionID, paramResolutionDetail[0]]);
						finalCollection.resolutions[resolutionID] = paramsCollectionAllResolutions[resolutionID];
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
				resolutionsToBeCreated.push([resolutionID, paramResolutions[resolutionID].content[0]]);
			}
		}

		resolutionsURLToBeDestroyed.forEach(URL.revokeObjectURL);

		for (const [id, buffer] of resolutionsToBeCreated) {
			const bufferURL = URL.createObjectURL(new Blob([buffer], { type: "image/*" }));

			if (!finalCollection.resolutions[id]) {
				finalCollection.resolutions[id] = {} as Partial<IdentifiedResolutions>[0];
			}

			finalCollection.resolutions[id].name = "";
			finalCollection.resolutions[id].content = [buffer, bufferURL];
		}

		return next<MediaEditAction>({
			type: ConfigActions.EDIT_MEDIA,
			collection: finalCollection,
			mediaLanguage: activeMediaLanguage,
			collectionID: action.collectionID,
			mediaName: action.mediaName
		});
	}
}

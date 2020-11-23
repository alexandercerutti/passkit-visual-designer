import JSZip from "jszip";
import { PassMixedProps } from "../Pass";
import { CollectionSet, LocalizedMediaGroup, MediaCollection, MediaSet } from "../store/state";

export async function exportPass(props: PassMixedProps, media: LocalizedMediaGroup) {
	const zip = new JSZip();

	/**
	 * Creating physical files
	 */

	const languagesMap = new Map(Object.entries(media));

	[
		...createPhysicalFilesBuffers(languagesMap),
		createPassJSON(props)
	]
		.forEach(([name, value]) =>
			zip.file(name, value, {
				binary: value instanceof ArrayBuffer
			})
		);

	return await zip.generateAsync({ type: "blob" });
}

function createPassJSON(passProps: PassMixedProps): [string, string] {
	/**
	 * Adding properties to pass.json
	 * But first... let me take a selfie! 🤳✌
	 *
	 * JK, first we are excluding the ones we want to handle
	 * separately or completely exclude.
	 */

	const {
		headerFields, auxiliaryFields, primaryFields, secondaryFields, backFields, transitType,
		kind, logo, backgroundImage, thumbnailImage, stripImage, icon, footerImage, ...topLevelProps
	} = passProps;

	const passJSONObject = {
		...topLevelProps,
		formatVersion: 1,
		[kind]: {
			headerFields,
			auxiliaryFields,
			primaryFields,
			secondaryFields,
			backFields,
			transitType
		}
	};

	return ["pass.json", JSON.stringify(passJSONObject)];
}

/**
 * Loops through languages and medias to find the medias and
 * the selected collections that should be exported.
 *
 * @param languagesMediaMap
 */

function createPhysicalFilesBuffers(languagesMediaMap: Map<string, MediaSet>): [string, ArrayBuffer][] {
	const buffersGenerator = exportMediaCollections();
	buffersGenerator.next(); // Init

	for (const [lang, mediaSet] of languagesMediaMap) {

		/**
		 * if lang is "default", we insert the
		 * files in root folder
		 */

		const folderPath = `${lang !== "default" && `${lang}.lproj/` || ""}`;

		for (const [mediaName, collection] of Object.entries(mediaSet)) {
			const { enabled, activeCollectionID, collections } = collection;
			const mediaPath = `${folderPath}${mediaName.replace(/image/ig, "")}`;

			if (enabled && activeCollectionID) {
				buffersGenerator.next([collections[activeCollectionID], mediaPath]);
			}
		}
	}

	return buffersGenerator.next().value;
}

type CollectionWithZipPath = [collection: MediaCollection, path: string] | undefined;
type ExportGeneratorReturn = Generator<
	any,
	[string, ArrayBuffer][],
	CollectionWithZipPath
>;

/**
 * Generator that waits for collections and paths
 * to loop and add only the selected collections
 */

function* exportMediaCollections(): ExportGeneratorReturn {
	const rawCollections: CollectionWithZipPath[] = [];
	const buffers: [string, ArrayBuffer][] = []
	let value: CollectionWithZipPath = null;

	while ((value = yield) !== undefined) {
		rawCollections.push(value);
	}

	for (let i = rawCollections.length, collection: CollectionWithZipPath; collection = rawCollections[--i];) {
		const [{ resolutions }, mediaPath] = collection;

		for (const res in resolutions) {
			const { name = "1x", content: [buffer] } = resolutions[res];
			const fileName = `${mediaPath}${name === mediaPath || name === "1x" ? "" : name}.png`;

			buffers.push([fileName, buffer]);
		}
	}

	return buffers;
}

import JSZip from "jszip";
import { Pass } from "@pkvd/passkit-types";
import { PassMixedProps } from "@pkvd/pkpass";
import type {
	LocalizedMediaGroup,
	LocalizedTranslationsGroup,
	MediaCollection,
	MediaSet,
	TranslationsSet,
} from "@pkvd/store";

export async function exportPass(
	props: Partial<PassMixedProps>,
	media: LocalizedMediaGroup,
	translations: LocalizedTranslationsGroup
) {
	const zip = new JSZip();

	/**
	 * Creating physical files
	 */

	const mediaLanguagesMap = new Map(Object.entries(media));
	const translationsLanguagesMap = new Map(Object.entries(translations));

	[
		...createPhysicalFilesBuffers(mediaLanguagesMap),
		...createTranslationsFiles(translationsLanguagesMap),
		createPassJSON(props),
	].forEach(([name, value]) =>
		zip.file(name, value, {
			binary: value instanceof ArrayBuffer,
		})
	);

	return await zip.generateAsync({ type: "blob" });
}

function createPassJSON(passProps: Partial<PassMixedProps>): [string, string] {
	/**
	 * Adding properties to pass.json
	 * But first... let me take a selfie! 🤳✌
	 *
	 * JK, first we are excluding the ones we want to handle
	 * separately or completely exclude.
	 */

	const {
		boardingPass,
		coupon,
		storeCard,
		eventTicket,
		generic,
		kind,
		logo,
		backgroundImage,
		thumbnailImage,
		stripImage,
		icon,
		footerImage,
		...topLevelProps
	} = passProps;

	let headerFields: Pass.PassFields.HeaderFields[];
	let auxiliaryFields: Pass.PassFields.AuxiliaryFields[];
	let secondaryFields: Pass.PassFields.SecondaryFields[];
	let backFields: Pass.PassFields.BackFields[];
	let primaryFields: Pass.PassFields.PrimaryFields[];
	let transitType: Pass.PKTransitType;

	if (boardingPass) {
		({ transitType } = boardingPass);
	}

	({ headerFields, auxiliaryFields, secondaryFields, backFields, primaryFields } = (boardingPass || coupon || storeCard || eventTicket || generic));

	const passJSONObject = {
		...topLevelProps,
		formatVersion: 1,
		[kind]: {
			headerFields: headerFields?.map(({ fieldUUID, ...field }) => field),
			auxiliaryFields: auxiliaryFields?.map(({ fieldUUID, ...field }) => field),
			primaryFields: primaryFields?.map(({ fieldUUID, ...field }) => field),
			secondaryFields: secondaryFields?.map(({ fieldUUID, ...field }) => field),
			backFields: backFields?.map(({ fieldUUID, ...field }) => field),
			transitType,
		},
	};

	return ["pass.json", JSON.stringify(passJSONObject)];
}

function createTranslationsFiles(languagesTranslationsMap: Map<string, TranslationsSet>) {
	const filesList: [string, string][] = [];
	for (const [lang, set] of languagesTranslationsMap) {
		if (lang !== "default" && set.enabled) {
			let fileContent = "";

			for (const id in set.translations) {
				const [placeholder, value] = set.translations[id];

				if (placeholder && value) {
					fileContent += stringsTag`${placeholder} = ${value}`;
				}
			}

			if (fileContent) {
				const targetFile = `${lang === "default" ? "" : `${lang}.lproj/`}pass.strings`;
				filesList.push([targetFile, fileContent]);
			}
		}
	}

	return filesList;
}

function stringsTag(strings: TemplateStringsArray, placeholder: string, value: string) {
	return `"${escapeStringsCharacters(placeholder)}"${strings[1]}"${escapeStringsCharacters(
		value
	)}";\n`;
}

function escapeStringsCharacters(content: string) {
	const sequences = ["\\", "\n", "\t", '"'];
	let newContent = content;

	for (let seq of sequences) {
		newContent = newContent.replace(seq, `\\${seq}`);
	}

	return newContent;
}

/**
 * Loops through languages and medias to find the medias and
 * the selected collections that should be exported.
 *
 * @param languagesMediaMap
 */

function createPhysicalFilesBuffers(
	languagesMediaMap: Map<string, MediaSet>
): [string, ArrayBuffer][] {
	const buffersGenerator = exportMediaCollections();
	buffersGenerator.next(); // Init

	for (const [lang, mediaSet] of languagesMediaMap) {
		/**
		 * if lang is "default", we insert the
		 * files in root folder
		 */

		const folderPath = `${(lang !== "default" && `${lang}.lproj/`) || ""}`;

		for (const [mediaName, collection] of Object.entries(mediaSet)) {
			const { enabled, activeCollectionID, collections } = collection;
			const mediaPath = `${folderPath}${mediaName.replace(/image/gi, "")}`;

			if (enabled && activeCollectionID) {
				buffersGenerator.next([collections[activeCollectionID], mediaPath]);
			}
		}
	}

	return buffersGenerator.next().value;
}

type CollectionWithZipPath = [collection: MediaCollection, path: string] | undefined;
type ExportGeneratorReturn = Generator<
	[string, ArrayBuffer][],
	[string, ArrayBuffer][],
	CollectionWithZipPath
>;

/**
 * Generator that waits for collections and paths
 * to loop and add only the selected collections
 */

function* exportMediaCollections(): ExportGeneratorReturn {
	const rawCollections: CollectionWithZipPath[] = [];
	const buffers: [string, ArrayBuffer][] = [];
	let value: CollectionWithZipPath = null;

	while ((value = yield) !== undefined) {
		rawCollections.push(value);
	}

	for (
		let i = rawCollections.length, collection: CollectionWithZipPath;
		(collection = rawCollections[--i]);

	) {
		const [{ resolutions }, mediaPath] = collection;

		for (const res in resolutions) {
			const { name = "1x", content: buffer } = resolutions[res];
			const fileName = `${mediaPath}${name === mediaPath || name === "1x" ? "" : name}.png`;

			buffers.push([fileName, buffer]);
		}
	}

	return buffers;
}

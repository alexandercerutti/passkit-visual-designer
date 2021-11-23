import * as React from "react";
import JSZip from "jszip";
import "./style.less";
import * as Store from "@pkvd/store";
import { GithubLogoDarkMode, AddIcon } from "./icons";
import localForage from "localforage";
import { createClassName } from "../utils";
import { ProjectSource, ProjectSourceData, StateLookalike } from "../App";
import { PassKind } from "../model";
import { CSSTransition } from "react-transition-group";

// Defined by webpack
declare const version: string;

const ZIP_FILE_PATH_SPLIT_REGEX = /(?:(?<language>.+)\.lproj\/)?(?<realFileName>.+)?/;
const ZIP_FILE_IGNORE_REGEX = /(^\.|manifest\.json|signature|personalization\.json)/;
const ZIP_FILE_STRINGS_PV_SPLIT_REGEX = /(?<placeholder>.+)\s=\s(?<value>.+);/;
const ZIP_FILE_STRINGS_PV_QUOTES_REPLACE_REGEX = /"/g;
const ZIP_FILE_NAME_EXT_REGEX = /(?<fileName>.+)\.(?<ext>(png|jpg))/;

interface Props {
	recentProjects: Store.Forage.ForageStructure["projects"];
	requestForageDataRequest(): Promise<void>;
	openProject<T extends ProjectSource>(source: T, data: ProjectSourceData<T>): void;
}

export default function RecentSelector(props: Props) {
	const [previewUrlList, setPreviewUrlList] /*********/ = React.useState<{
		[projectID: string]: string;
	}>({});
	const [errorOverlay, setErrorOverlay] /*************/ = React.useState<string>(null);
	const [isEditMode, setEditMode] /*******************/ = React.useState<boolean>(false);
	const [isProcessingUpload, setUploadProcessing] /***/ = React.useState<boolean>(false);

	React.useEffect(() => {
		const refreshInterval = window.setInterval(async () => {
			try {
				await props.requestForageDataRequest();
			} catch (err) {}
		}, 1500);

		return () => {
			clearInterval(refreshInterval);

			/**
			 * Setting state so we can access directly to previous value
			 * and prevent the need of creating the timer everytime
			 */

			setPreviewUrlList((previous) => {
				for (let url of Object.values(previous)) {
					URL.revokeObjectURL(url);
				}

				return {};
			});
		};
	}, []);

	React.useLayoutEffect(() => {
		// Refreshing previews url based on new props
		setPreviewUrlList((previous) => {
			const uniqueProjectsID = [
				...new Set([...Object.keys(previous), ...Object.keys(props.recentProjects)]),
			];

			return uniqueProjectsID.reduce((acc, current) => {
				if (!props.recentProjects[current]) {
					URL.revokeObjectURL(previous[current]);
					return acc;
				}

				return {
					...acc,
					[current]:
						previous[current] ||
						URL.createObjectURL(
							new Blob([props.recentProjects[current].preview], { type: "image/*" })
						),
				};
			}, {});
		});
	}, [props.recentProjects]);

	React.useEffect(() => {
		// Forcing reset of edit mode if there's nothing to edit.

		if (!Object.keys(previewUrlList).length) {
			setEditMode(false);
		}
	}, [previewUrlList]);

	const onUploadProcess = React.useCallback(async (event: React.FormEvent<HTMLInputElement>) => {
		setErrorOverlay(null);
		setUploadProcessing(true);

		try {
			const payload = await processUploadedFile(event);
			props.openProject(ProjectSource.UPLOAD, payload);
		} catch (err) {
			setErrorOverlay(`Unable to complete import. ${err.message}`);
		} finally {
			setUploadProcessing(false);
		}
	}, []);

	const onProjectRemove = React.useCallback(async (id: string) => {
		const projects = await localForage.getItem<Store.Forage.ForageStructure["projects"]>(
			"projects"
		);

		delete projects[id];

		await localForage.setItem("projects", projects);
		props.requestForageDataRequest();
	}, []);

	const deleteButtonClassName = createClassName(["delete"], {
		open: isEditMode,
	});

	const savedProjects = Object.entries(props.recentProjects).map(([id, { snapshot }]) => {
		const alt = `Preview of project named ${snapshot.projectOptions.title || ""} (${id})`;

		return (
			<li key={id}>
				<div className="left" onClick={() => props.openProject(ProjectSource.RECENT, id)}>
					<img alt={alt} src={previewUrlList[id]} />
					<span>{snapshot.projectOptions.title || "Untitled project"}</span>
				</div>
				<div className="right">
					<span className={deleteButtonClassName} onClick={() => onProjectRemove(id)}>
						Delete
					</span>
				</div>
			</li>
		);
	});

	return (
		<div id="recent-selector">
			<header>
				<div>
					<h4>
						Passkit Visual Designer <span id="version">v{version}</span>
					</h4>
				</div>
				<div>
					<a href="https://git.io/JLNCQ" target="_blank" rel="noopener">
						<GithubLogoDarkMode width="25px" height="25px" />
					</a>
				</div>
			</header>
			<main>
				<CSSTransition in={Boolean(errorOverlay)} timeout={1000} unmountOnExit mountOnEnter>
					<div className="error-area" onClick={() => setErrorOverlay(null)}>
						<div id="error-box" onClick={(e) => e.stopPropagation()}>
							<h2>Import error</h2>
							<span>{errorOverlay}</span>
						</div>
					</div>
				</CSSTransition>
				<div className="centered-column">
					<section>
						<div id="choices-box" className={isProcessingUpload ? "loading" : ""}>
							<div
								onClick={() =>
									!isProcessingUpload && props.openProject(ProjectSource.NEW, undefined)
								}
							>
								<AddIcon width="32px" height="32px" />
								<span>Create Project</span>
							</div>
							<label htmlFor="zip-upload">
								<AddIcon width="32px" height="32px" />
								<span>Upload pass</span>
								<input
									hidden
									type="file"
									accept=".zip,.pkpass"
									id="zip-upload"
									disabled={isProcessingUpload}
									onChange={onUploadProcess}
								/>
								<sub>Supported types: .zip, .pkpass</sub>
							</label>
						</div>
					</section>
					<section>
						<div className="recents-box">
							<header>
								<h2>Recent Projects</h2>
								<button
									disabled={!savedProjects.length}
									onClick={() => setEditMode((previous) => !previous)}
									className={isEditMode ? "editing" : ""}
								>
									{isEditMode ? "Done" : "Edit"}
								</button>
							</header>
							<main>
								{(savedProjects.length && <ul>{savedProjects}</ul>) || (
									<span>No recent projects yet. Local recent projects will appear here below.</span>
								)}
							</main>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

async function processUploadedFile(event: React.FormEvent<HTMLInputElement>) {
	const { currentTarget } = event;
	const { files: uploadFiles } = currentTarget;

	const parsedPayload: StateLookalike = {
		pass: null,
		translations: {},
		media: {},
		projectOptions: {
			title: "Imported Project",
		},
	};

	const firstZipFile = Array.prototype.find.call(uploadFiles, (file: File) =>
		/.+\.(zip|pkpass)/.test(file.name)
	);

	if (!firstZipFile) {
		const ext = uploadFiles[0].name.match(/\.(.+)/g)[0];
		throw new Error(
			`Unsupported file type (${ext}). Only .zip and .pkpass can be used as starting point.`
		);
	}

	let zip: JSZip = null;

	try {
		zip = await JSZip.loadAsync(firstZipFile, { createFolders: false });
	} catch (err) {
		throw new Error(`Zip loading error (${err}).`);
	} finally {
		currentTarget.value = ""; /** Resetting input */
	}

	const filesNames = Object.entries(zip.files);

	for (let i = filesNames.length, file: typeof filesNames[0]; (file = filesNames[--i]); ) {
		const [filePath, fileObject] = file;

		const match = filePath.match(ZIP_FILE_PATH_SPLIT_REGEX);
		const { language, realFileName } = match.groups as {
			language?: string;
			realFileName?: string;
		};

		const isIgnoredFile = ZIP_FILE_IGNORE_REGEX.test(realFileName);
		const isDirectoryRecord = language && !realFileName;
		const isFileInDirectory = language && realFileName;

		const shouldSkip =
			/** Ignoring record, it is only the folder, we don't need it */
			isDirectoryRecord ||
			/** Is dynamic or unsupported file */
			isIgnoredFile;

		if (shouldSkip) {
			continue;
		}

		if (realFileName === "pass.json") {
			try {
				let passInfo;

				try {
					passInfo = JSON.parse(await fileObject.async("string"));
				} catch (err) {
					throw `Bad JSON. (${err})`;
				}

				const { boardingPass, coupon, storeCard, eventTicket, generic, ...otherPassProps } =
					passInfo;
				const { transitType } = boardingPass || {};

				let kind: PassKind = null;
				let sourceOfFields = null;

				if (boardingPass) {
					kind = PassKind.BOARDING_PASS;
					const { transitType, ...boarding } = boardingPass;
					sourceOfFields = boarding;
				} else if (coupon) {
					kind = PassKind.COUPON;
					sourceOfFields = coupon;
				} else if (storeCard) {
					kind = PassKind.STORE;
					sourceOfFields = storeCard;
				} else if (eventTicket) {
					kind = PassKind.EVENT;
					sourceOfFields = eventTicket;
				} else if (generic) {
					kind = PassKind.GENERIC;
					sourceOfFields = generic;
				} else {
					throw "Missing kind (boardingPass, coupon, storeCard, eventTicket, generic) to start from.";
				}

				parsedPayload.pass = Object.assign(otherPassProps, {
					kind,
					transitType,
					...(sourceOfFields || null),
				});

				continue;
			} catch (err) {
				throw new Error(`Cannot parse pass.json: ${err}`);
			}
		}

		if (isFileInDirectory) {
			if (realFileName === "pass.strings") {
				/**
				 * Replacing BOM (Byte order mark).
				 * This could affect matching between
				 * fields and placeholders.
				 */

				const file = (await fileObject.async("string")).replace(/\uFEFF/g, "");

				file
					.split("\n")
					.map((row) => row.match(ZIP_FILE_STRINGS_PV_SPLIT_REGEX))
					.forEach((match) => {
						if (!match?.groups) {
							return;
						}

						(parsedPayload.translations[language] ??= []).push([
							match.groups.placeholder.replace(ZIP_FILE_STRINGS_PV_QUOTES_REPLACE_REGEX, ""),
							match.groups.value.replace(ZIP_FILE_STRINGS_PV_QUOTES_REPLACE_REGEX, ""),
						]);
					});
			} else if (ZIP_FILE_NAME_EXT_REGEX.test(realFileName)) {
				const file = await fileObject.async("arraybuffer");

				(parsedPayload.media[language] ??= []).push([realFileName, file]);
			}
		} else {
			const file = await fileObject.async("arraybuffer");

			(parsedPayload.media["default"] ??= []).push([realFileName, file]);
		}
	}

	if (!parsedPayload.pass) {
		throw new Error("Missing pass.json");
	}

	return parsedPayload;
}

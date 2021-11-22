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

interface State {
	previewsURLList: { [projectID: string]: string };
	editMode: boolean;
	isProcessingZipFile: boolean;
	showError: boolean;
}

export default class RecentSelector extends React.Component<Props, State> {
	private refreshInterval: number;
	private errorMessage: string = "";

	constructor(props: Props) {
		super(props);

		this.state = {
			previewsURLList: {},
			editMode: false,
			showError: false,
			isProcessingZipFile: false,
		};

		this.switchEditMode = this.switchEditMode.bind(this);
		this.selectRecent = this.selectRecent.bind(this);
		this.processUploadedFile = this.processUploadedFile.bind(this);
		this.toggleErrorOverlay = this.toggleErrorOverlay.bind(this);
	}

	async componentDidMount() {
		this.refreshInterval = window.setInterval(async () => {
			try {
				await this.props.requestForageDataRequest();
			} catch (err) {}
		}, 1500);
	}

	static getDerivedStateFromProps(props: Props, state: State) {
		const newState = { ...state };

		const allProjectsIDs = [
			...new Set([...Object.keys(state.previewsURLList), ...Object.keys(props.recentProjects)]),
		];

		newState.previewsURLList = allProjectsIDs.reduce((acc, current) => {
			if (!props.recentProjects[current]) {
				URL.revokeObjectURL(state.previewsURLList[current]);
				/** When a projects gets removed*/
				return acc;
			}

			if (state.previewsURLList[current]) {
				return {
					...acc,
					[current]: state.previewsURLList[current],
				};
			}

			return {
				...acc,
				[current]: URL.createObjectURL(
					new Blob([props.recentProjects[current].preview], { type: "image/*" })
				),
			};
		}, {});

		if (!Object.keys(newState.previewsURLList).length) {
			newState.editMode = false;
		}

		return newState;
	}

	componentWillUnmount() {
		clearInterval(this.refreshInterval);
		Object.values(this.state.previewsURLList).forEach(URL.revokeObjectURL);
	}

	switchEditMode() {
		this.setState((previous) => ({
			editMode: !previous.editMode,
		}));
	}

	async removeProject(id: string) {
		const projects = await localForage.getItem<Store.Forage.ForageStructure["projects"]>(
			"projects"
		);

		delete projects[id];

		await localForage.setItem("projects", projects);
		this.props.requestForageDataRequest();
	}

	async selectRecent(id: string) {
		this.props.openProject(ProjectSource.RECENT, id);
	}

	async processUploadedFile(event: React.FormEvent<HTMLInputElement>) {
		const { currentTarget } = event;
		const { files: uploadFiles } = currentTarget;

		this.setState({
			showError: false,
			isProcessingZipFile: true,
		});

		try {
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

			this.setState({
				isProcessingZipFile: false,
			});

			this.props.openProject(ProjectSource.UPLOAD, parsedPayload);
		} catch (err) {
			this.toggleErrorOverlay(`Unable to complete import. ${err.message}`);

			this.setState({
				isProcessingZipFile: false,
			});
		}
	}

	/**
	 * Shows or hides error message. We want to
	 * show it before opening animation and remove
	 * it after closing animation.
	 *
	 * @param errorMessage
	 */

	toggleErrorOverlay(errorMessage: string = "") {
		if (!this.errorMessage) {
			this.errorMessage = errorMessage;
		}

		this.setState(
			(previous) => ({
				showError: !previous.showError,
			}),
			() => {
				if (!errorMessage) {
					this.errorMessage = errorMessage;
				}
			}
		);
	}

	render() {
		const deleteButtonClassName = createClassName(["delete"], {
			open: this.state.editMode,
		});

		const savedProjects = Object.entries(this.props.recentProjects).map(([id, { snapshot }]) => {
			const alt = `Preview of project named ${snapshot.projectOptions.title || ""} (${id})`;

			return (
				<li key={id}>
					<div className="left" onClick={() => this.selectRecent(id)}>
						<img alt={alt} src={this.state.previewsURLList[id]} />
						<span>{snapshot.projectOptions.title || "Untitled project"}</span>
					</div>
					<div className="right">
						<span className={deleteButtonClassName} onClick={() => this.removeProject(id)}>
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
					<CSSTransition in={this.state.showError} timeout={1000} unmountOnExit mountOnEnter>
						<div className="error-area" onClick={() => this.toggleErrorOverlay()}>
							<div id="error-box" onClick={(e) => e.stopPropagation()}>
								<h2>Import error</h2>
								<span>{this.errorMessage}</span>
							</div>
						</div>
					</CSSTransition>
					<div className="centered-column">
						<section>
							<div id="choices-box" className={this.state.isProcessingZipFile ? "loading" : ""}>
								<div
									onClick={() =>
										!this.state.isProcessingZipFile &&
										this.props.openProject(ProjectSource.NEW, undefined)
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
										disabled={this.state.isProcessingZipFile}
										onChange={this.processUploadedFile}
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
										onClick={this.switchEditMode}
										className={this.state.editMode ? "editing" : ""}
									>
										{this.state.editMode ? "Done" : "Edit"}
									</button>
								</header>
								<main>
									{(savedProjects.length && <ul>{savedProjects}</ul>) || (
										<span>
											No recent projects yet. Local recent projects will appear here below.
										</span>
									)}
								</main>
							</div>
						</section>
					</div>
				</main>
			</div>
		);
	}
}

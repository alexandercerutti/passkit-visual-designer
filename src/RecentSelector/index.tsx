import * as React from "react";
import JSZip from "jszip";
import "./style.less";
import * as Store from "../store";
import { GithubLogoDarkMode, AddIcon } from "./icons";
import localForage from "localforage";
import { createClassName } from "../utils";
import { StateLookalike } from "../App";
import { PassKind } from "../model";

interface Props {
	recentProjects: Store.Forage.ForageStructure["projects"];
	requestForageDataRequest(): Promise<void>;
	initStore(projectID: string): Promise<void>;
	pushHistory(path: string, init?: Function): void;
	createProjectFromArchive(data: StateLookalike): void;
}

interface State {
	previewsURLList: { [projectID: string]: string };
	editMode: boolean;
	refreshing: boolean;
}

export default class RecentSelector extends React.Component<Props, State> {
	private refreshInterval: number;
	private delayLoadingAnimationTimeout: number;

	constructor(props: Props) {
		super(props);

		this.state = {
			previewsURLList: {},
			editMode: false,
			refreshing: false,
		};

		this.switchEditMode = this.switchEditMode.bind(this);
		this.selectRecent = this.selectRecent.bind(this);
		this.toggleRefreshing = this.toggleRefreshing.bind(this);
		this.processUploadedFile = this.processUploadedFile.bind(this);
	}

	componentDidMount() {
		// When going back to this page we want to request an update
		if (!Object.keys(this.props.recentProjects || {}).length) {
			this.props.requestForageDataRequest();
		}

		this.refreshInterval = window.setInterval(async () => {
			this.toggleRefreshing();

			await Promise.all([
				this.props.requestForageDataRequest(),
				new Promise(resolve => (this.delayLoadingAnimationTimeout = window.setTimeout(resolve, 2000)))
			]);

			this.toggleRefreshing();
		}, 7000);
	}

	static getDerivedStateFromProps(props: Props, state: State) {
		const newState = { ...state };

		const allProjectsIDs = [
			...new Set([
				...Object.keys(state.previewsURLList),
				...Object.keys(props.recentProjects)
			])
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
					[current]: state.previewsURLList[current]
				};
			}

			return {
				...acc,
				[current]: URL.createObjectURL(
					new Blob([props.recentProjects[current].preview], { type: "image/*" })
				)
			};
		}, {});

		if (!Object.keys(newState.previewsURLList).length) {
			newState.editMode = false;
		}

		return newState;
	}

	componentWillUnmount() {
		clearInterval(this.refreshInterval);
		clearTimeout(this.delayLoadingAnimationTimeout);
		Object.values(this.state.previewsURLList).forEach(URL.revokeObjectURL);
	}

	toggleRefreshing() {
		this.setState((previous) => ({
			refreshing: !previous.refreshing,
		}));
	}

	switchEditMode() {
		this.setState(previous => ({
			editMode: !previous.editMode
		}));
	}

	async removeProject(id: string) {
		const projects = await localForage.getItem<Store.Forage.ForageStructure["projects"]>("projects");

		delete projects[id];

		await localForage.setItem("projects", projects);
		this.props.requestForageDataRequest();
	}

	async selectRecent(id: string) {
		this.props.pushHistory("/creator", () => this.props.initStore(id));
	}

	async processUploadedFile(event: React.FormEvent<HTMLInputElement>) {
		const { currentTarget } = event;
		const { files: uploadFiles } = currentTarget;

		const parsedPayload: StateLookalike = {
			pass: null,
			translations: {},
			media: {},
			projectOptions: {
				title: "Imported Project"
			}
		};

		const firstZipFile = Array.prototype.find.call(uploadFiles, (file: File) =>
			/.+\.(zip|pkpass)/.test(file.name)
		);

		if (!firstZipFile) {
			throw "Failed loading file. No .zip or .pkpass files found";
		}

		let zip: JSZip = null;

		try {
			zip = await JSZip.loadAsync(firstZipFile, { createFolders: false });
		} catch (err) {
			// @TODO Handle error through popup?
			console.error(err);
			return;
		} finally {
			currentTarget.value = ""; /** Resetting input */
		}

		const filesNames = Object.entries(zip.files);

		for (let i = filesNames.length, file: typeof filesNames[0]; file = filesNames[--i];) {
			const [ filePath, fileObject ] = file;

			const match = filePath.match(/(?:(?<language>.+)\.lproj\/)?(?<realFileName>.+)?/);
			const { language, realFileName } = match.groups as { language?: string, realFileName?: string };

			const isIgnoredFile = /(^\.|manifest\.json|signature|personalization\.json)/.test(realFileName);
			const isDirectoryRecord = language && !realFileName;
			const isFileInDirectory = language && realFileName;

			const shouldSkip = (
				/** Ignoring record, it is only the folder, we don't need it */
				isDirectoryRecord ||
				/** Is dynamic or unsupported file */
				isIgnoredFile
			);

			if (shouldSkip) {
				continue;
			}

			if (realFileName === "pass.json") {
				try {
					const passInfo = JSON.parse(await fileObject.async("string"));
					const { boardingPass, coupon, storeCard, eventTicket, generic, ...otherPassProps } = passInfo;

					let kind: PassKind = null;
					let sourceOfFields = null;

					if (boardingPass) {
						kind = PassKind.BOARDING_PASS;
						sourceOfFields = boardingPass;
					} else if (coupon) {
						kind = PassKind.COUPON;
						sourceOfFields = coupon;
					} else if (storeCard) {
						kind = PassKind.STORE;
						sourceOfFields = storeCard;
					} else if (eventTicket) {
						kind = PassKind.EVENT;
						sourceOfFields = eventTicket;
					} else {
						kind = PassKind.GENERIC;
						sourceOfFields = generic;
					}

					parsedPayload.pass = Object.assign(otherPassProps, {
						kind,
						...(sourceOfFields || null)
					});

					continue;
				} catch (err) {
					/**
					 * @TODO invalid json, throw error as popup?
					 */
					console.error(err);
					return;
				}
			}

			if (isFileInDirectory) {
				if (realFileName === "pass.strings") {
					const file = await fileObject.async("string");

					file.split("\n")
						.map(row => row.match(/(?<placeholder>.+)\s=\s(?<value>.+);/))
						.forEach((match) => {
							if (!match?.groups) {
								return;
							}

							(parsedPayload.translations[language] ??= [])
								.push([match.groups.placeholder.replace(/"/g, ""), match.groups.value.replace(/"/g, "")]);
						});
				} else if (/(?<fileName>.+)\.(?<ext>(png|jpg))/.test(realFileName)) {
					const file = await fileObject.async("arraybuffer");

					(parsedPayload.media[language] ??= [])
						.push([realFileName, file]);
				}
			} else {
				const file = await fileObject.async("arraybuffer");

				(parsedPayload.media["default"] ??= [])
					.push([realFileName, file]);
			}
		}

		return this.props.createProjectFromArchive(parsedPayload);
	}

	render() {
		const deleteButtonClassName = createClassName(["delete"], {
			open: this.state.editMode
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
						<h4>Passkit Visual Designer</h4>
					</div>
					<div>
						<a href="https://git.io/JLNCQ">
							<GithubLogoDarkMode width="25px" height="25px" />
						</a>
					</div>
				</header>
				<main>
					<div className="centered-column">
						<section>
							<div id="choices-box">
								<div onClick={() => this.props.pushHistory("/select")}>
									<AddIcon width="32px" height="32px" />
									<span>Create Project</span>
								</div>
								<label htmlFor="zip-upload">
									<AddIcon width="32px" height="32px" />
									<span>Upload pass</span>
									<input id="zip-upload" hidden type="file" onChange={this.processUploadedFile} />
								</label>
							</div>
						</section>
						<section>
							<div className="recents-box">
								<header className={this.state.refreshing ? "refreshing" : null}>
									<h2>Recent Projects</h2>
									<button disabled={!savedProjects.length} onClick={this.switchEditMode} className={this.state.editMode ? "editing" : ""}>
										{
											this.state.editMode
												? "Done"
												: "Edit"
										}
									</button>
								</header>
								<main>
									{
										savedProjects.length && (
											<ul>
												{savedProjects}
											</ul>
										) || (
											<span>
												No recent projects yet. Local recent projects will appear here below.
											</span>
										)
									}
								</main>
							</div>
						</section>
					</div>
				</main>
			</div>
		);
	}
}

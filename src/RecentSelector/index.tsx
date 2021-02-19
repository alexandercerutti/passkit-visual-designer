import * as React from "react";
import "./style.less";
import * as Store from "../store";
import { GithubLogoDarkMode, AddIcon } from "./icons";
import localForage from "localforage";
import { createClassName } from "../utils";

interface Props {
	recentProjects: Store.Forage.ForageStructure["projects"];
	requestForageDataRequest(): Promise<void>;
	initStore(projectID: string): Promise<void>;
	pushHistory(path: string, init?: Function): void;
}

interface State {
	previewsURLList: { [projectID: string]: string };
	editMode: boolean;
	refreshing: boolean;
}

export default class RecentSelector extends React.Component<Props, State> {
	private refreshInterval: number;

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
				new Promise(resolve => setTimeout(resolve, 2000))
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
								<div>
									<AddIcon width="32px" height="32px" />
									<span>Upload pass</span>
								</div>
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

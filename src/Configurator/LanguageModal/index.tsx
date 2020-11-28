import * as React from "react";
import "./style.less";
import Modal from "../ModalBase";
import { languages } from "./languages";

interface Props {
	closeModal(): void;
	usedLanguages: Set<string>;
	selectLanguage(languageCode: string): void;
}

export default function LanguageModal(props: Props) {
	const languagesRegions = Object.entries(languages).map(([region, languages]) => {
		const languagesList = Object.entries(languages).map(([ISO639alpha1, language]) => (
			<div
				key={ISO639alpha1}
				className={props.usedLanguages.has(language) ? "used" : ""}
				onClick={() => props.selectLanguage(ISO639alpha1)}
				title={`Language code: ${ISO639alpha1}`}
			>
				{language}
			</div>
		));

		return (
			<React.Fragment key={region}>
				<h2>{region}</h2>
				<div className="languages-grid">
					{languagesList}
				</div>
			</React.Fragment>
		);
	});

	return (
		<Modal
			closeModal={props.closeModal}
			contentUniqueID="language"
		>
			<header>
				<h1>Choo-choose a language.</h1>
				<p>The list is contains languages supported by Apple. Keep cursor on a language to see its ISO 639-1 code.</p>
			</header>
			<div className="languages-list">
				<h2>Default</h2>
				<div className="languages-grid">
					<div
						className={props.usedLanguages.has("default") ? "used" : ""}
						onClick={() => props.selectLanguage("default")}
						title={"This is the root folder of your pass. Any media / translation here will be valid for each unused or not overriden language"}
					>
						Default (root)
					</div>
				</div>
				{languagesRegions}
			</div>
			<div className="scroll-indicator" />
		</Modal>
	);
}

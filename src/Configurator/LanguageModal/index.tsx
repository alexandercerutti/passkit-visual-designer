import * as React from "react";
import "./style.less";
import Modal from "../ModalBase";
import { languages } from "./languages";

interface Props {
	closeModal(): void;
	selectLanguage(languageCode: string): void;
}

export default function LanguageModal(props: Props) {
	const languagesRegions = Object.entries(languages).map(([region, languages]) => {
		const languagesList = Object.entries(languages).map(([ISO639alpha1, language]) => (
			<div onClick={() => props.selectLanguage(ISO639alpha1)} title={`Language code: ${ISO639alpha1}`}>
				{language}
			</div>
		));

		return (
			<>
				<h2>{region}</h2>
				<div className="languages-grid">
					{languagesList}
				</div>
			</>
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
				{languagesRegions}
			</div>
		</Modal>
	);
}

import * as React from "react";
import "./style.less";
import Prism from "prismjs";
import { createClassName } from "../../utils";
import { PassMixedProps } from "../../Pass";
import Modal, { ModalProps } from "../ModalBase";
import * as Store from "../../store";
import * as templates from "../../../partners-templates";

/** Defined by Webpack */
declare const partners: Partner[];

/**
 * This modal must receive some data to generate, for each "partner"
 * the model importing example.
 *
 * To describe every partner, I need a way to describe code chunks for
 * each field, epecially mocked ones.
 *
 */

interface Partner {
	showName: string;
	lang: string;
	templateName: string;
}

interface Props extends Omit<ModalProps, "contentUniqueID"> {
	passProps: PassMixedProps;
	translations: Store.LocalizedTranslationsGroup;
	projectOptions: Store.ProjectOptions;
	media: Store.LocalizedMediaGroup;
}

export default function ExportModal(props: Props) {
	const [activePartnerTab, setActivePartnerTab] = React.useState(0);
	const codeRef = React.useRef<HTMLElement>();

	React.useEffect(() => {
		// To load line-numbers (for some reason, they don't get loaded
		// if element is not loaded with the page)
		Prism.highlightElement(codeRef.current);
	}, [activePartnerTab]);

	const partnerTabs = partners.map((partner, index) => {
		const className = createClassName(["tab"], {
			active: index === activePartnerTab,
		});

		return (
			<div className={className} onClick={() => setActivePartnerTab(index)} key={`tab${index}`}>
				{partner.showName}
			</div>
		);
	});

	const { templateName, lang } = partners[activePartnerTab];
	const partnerFilledContent = templates[templateName]({
		store: {
			pass: props.passProps,
			translations: props.translations,
			projectOptions: props.projectOptions,
			media: props.media,
		},
	});

	const codeLanguage = `language-${lang}`;

	return (
		<Modal closeModal={props.closeModal} contentUniqueID="export">
			<h2>
				Great <span>Pass</span>!
			</h2>
			<p>
				Your model is now being exported. Here below you can see some open source libraries examples
				to generate programmatically passes with your mock data compiled. Enjoy!
			</p>
			<div className="tabs">{partnerTabs}</div>
			<div className="partner-example">
				<pre className={`line-numbers ${codeLanguage}`}>
					<code
						ref={codeRef}
						dangerouslySetInnerHTML={{
							__html: Prism.highlight(partnerFilledContent, Prism.languages[lang], lang),
						}}
					/>
				</pre>
			</div>
		</Modal>
	);
}

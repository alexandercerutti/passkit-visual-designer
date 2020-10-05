import * as React from "react";
import "./style.less";
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";
import { createClassName } from "../../utils";
import { replaceAllBlock } from "./transformers";
import { PassMixedProps } from "../../Pass";
import ModalCloseIcon from "./icons";
import Modal, { ModalProps } from "../ModalBase";

/**
 * This modal must receive some data to generate, for each "partner"
 * the model importing example.
 *
 * To describe every partner, I need a way to describe code chunks for
 * each field, epecially mocked ones.
 *
 */

interface Partner {
	name: string;
	lang: string; // @TODO to evaluate the insertion of language
	template: string;
}

interface Props extends Omit<ModalProps, "contentClassName"> {
	partners: Partner[];
	dataBank: PassMixedProps;
}

export default function ExportModal(props: Props) {
	const [activePartnerTab, setActivePartnerTab] = React.useState(0);
	const codeRef = React.useRef<HTMLElement>();

	React.useEffect(() => {
		// To load line-numbers (for some reason, they don't get loaded
		// if element is not loaded with the page)
		Prism.highlightElement(codeRef.current);
	}, [activePartnerTab]);

	const partnerTabs = props.partners.map((partner, index) => {
		const className = createClassName(["tab"], {
			"active": index === activePartnerTab
		});

		return (
			<div
				className={className}
				onClick={() => setActivePartnerTab(index)}
				key={`tab${index}`}
			>
				{partner.name}
			</div>
		);
	});

	const { template, lang } = props.partners[activePartnerTab];

	const partnerFilledContent = replaceAllBlock(template, props.dataBank || {});

	const codeLanguage = `language-${lang}`;

	return (
		<Modal
			closeModal={props.closeModal}
			contentClassName="export"
		>
			<ModalCloseIcon
				width={22}
				height={22}
				onClick={() => props.closeModal()}
			/>
			<h2>Great <span>Pass</span>!</h2>
			<p>Your model is now being exported. Here below you can see some open source libraries examples to generate programmatically passes with your mock data compiled. Enjoy!</p>
			<div className="tabs">
				{partnerTabs}
			</div>
			<div className="partner-example">
				<pre className={`line-numbers ${codeLanguage}`}>
					<code
						ref={codeRef}
						dangerouslySetInnerHTML={{ __html: Prism.highlight(partnerFilledContent, Prism.languages[lang], lang) }}
					/>
				</pre>
			</div>
		</Modal>
	);
}

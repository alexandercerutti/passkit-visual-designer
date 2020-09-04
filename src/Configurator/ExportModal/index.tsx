import * as React from "react";
import "./style.less";
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";
import { createClassName } from "../../utils";
import { replaceAllBlock } from "./transformers";

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

interface Props {
	partners: Partner[];
}

export default function ExportModal(props: Props) {
	const [activePartnerTab, setActivePartnerTab] = React.useState(0);

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

	const partnerFilledContent = replaceAllBlock(template, {
		description: "capocchium",
		serialNumber: undefined
	});

	const codeLanguage = `language-${lang}`;

	return (
		<div id="export-modal">
			<div id="modal-content">
				<h2>Great <span>Pass</span>!</h2>
				<p>Your model is now being exported. Here below you can see some open source libraries examples to generate programmatically passes with your mock data compiled. Enjoy!</p>
				<div className="tabs">
					{partnerTabs}
				</div>
				<div className="partner-example">
					<pre className="line-numbers">
						<code
							className={codeLanguage}
							dangerouslySetInnerHTML={{ __html: Prism.highlight(partnerFilledContent, Prism.languages[lang], lang) }}
						/>
					</pre>
				</div>
			</div>
			<div id="close-overlay"></div>
		</div>
	);
}

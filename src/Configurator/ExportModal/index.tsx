import * as React from "react";
import "./style.less";
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";

/**
 * This modal must receive some data to generate, for each "partner"
 * the model importing example.
 *
 * To describe every partner, I need a way to describe code chunks for
 * each field, epecially mocked ones.
 *
 */

export default function ExportModal() {
	const [activePartnerTab, setActivePartnerTab] = React.useState(0);

	const partnersMock = ["Partner 1", "Partner 2", "Partner 3"];

	const partnerTabs = partnersMock.map((partner, index) => (
		<div
			className={`tab${index === activePartnerTab && " active" || ""}`}
			onClick={() => setActivePartnerTab(index)}
			key={`tab${index}`}
		>
			{partner}
		</div>
	));

	return (
		<div id="export-modal">
			<div id="modal-content">
				<h2>Great <span>Pass</span>!</h2>
				<p>Your model is now being exported. Here below you can see some open source libraries examples to generate programmatically passes with your mock data compiled. Enjoy!</p>
				<div className="tabs">
					{partnerTabs}
				</div>
				<div className="partner-example"></div>
			</div>
			<div id="close-overlay"></div>
		</div>
	);
}

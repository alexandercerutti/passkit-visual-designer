import * as React from "react";
import "./style.less";

export default function FieldsDrawerPlaceholder() {
	return (
		<div id="fields-placeholder">
			<svg className="icon" viewBox="0 0 200 50">
				<text y="35" x="20">¯\_(ツ)_/¯</text>
			</svg>
			<p>There are no fields here yet.</p>
			<p>What about starting adding some? 🤔</p>
		</div>
	);
}

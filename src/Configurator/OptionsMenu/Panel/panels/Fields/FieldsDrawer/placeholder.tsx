import * as React from "react";

export function FieldsDrawerPlaceholder() {
	return (
		<div className="fields-placeholder">
			<svg className="icon" viewBox="0 0 200 50">
				<text y="35" x="20">¯\_(ツ)_/¯</text>
			</svg>
			<p>There are no fields here yet.</p>
			<p>What about starting adding some? 🤔</p>
		</div>
	);
}

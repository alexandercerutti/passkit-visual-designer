// Plus by Kirk Draheim from the Noun Project
// https://thenounproject.com/term/plus/3539744

import * as React from "react";

export function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 25 25" {...props}>
			<path d="M12.5 0c.6 0 1 .4 1 1v10.5H24c.5 0 .9.4 1 .9v.1c0 .6-.4 1-1 1H13.5V24c0 .5-.4.9-.9 1h-.1c-.6 0-1-.4-1-1V13.5H1c-.5 0-.9-.4-1-.9v-.1c0-.6.4-1 1-1h10.5V1c0-.5.4-.9.9-1h.1z" />
		</svg>
	);
}

// edit by Markus from the Noun Project (edited)
// https://thenounproject.com/term/edit/3126120

export function EditIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 70 70" {...props}>
			<path d="M9.44 43.24L50.22 2.46a2.45 2.45 0 013.46 0l13.85 13.86a2.45 2.45 0 010 3.47L26.77 60.56zM1.85 64A3.4 3.4 0 006 68.16l17.49-4.29L6.14 46.54z" />
		</svg>
	);
}

// @TODO Link to the one in pages - this has been brought here from there
// Arrow by Kirsh from the Noun Project (edited)
// https://thenounproject.com/term/arrow/1256496

export function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 64 64" {...props} id="back">
			<path d="M15.64 62.8a4.1 4.1 0 005.8 0l27.88-27.86a4.1 4.1 0 000-5.8L21.44 1.27a4.1 4.1 0 00-5.94 5.66l.15.15 25 25-25 25a4.1 4.1 0 000 5.8z" />
		</svg>
	);
}

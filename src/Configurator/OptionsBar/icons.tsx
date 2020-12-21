import * as React from "react";

// visibility by Knut M. Synstad from the Noun Project (heavily edited)
// https://thenounproject.com/term/visibility/873045

export function EyeVisibleIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 22 22" {...props}>
			<path d="M17.4 11.2c.1-.1.1-.3 0-.5-.2-.2-.9-1-2.5-2-.3-.2-.6-.3-.9-.5-.4-.2-.8-.3-1.1-.4-.6-.2-1.2-.3-1.8-.3-3.4 0-6.1 2.9-6.4 3.2-.1.1-.1.3 0 .5.9 1 2 1.7 2.5 2 0 0 1.1.6 2.1.9.7.2 1.4.3 1.8.3 3.4 0 6-2.9 6.3-3.2zM11 13.7c-.4 0-.8 0-1.2-.1-.6-.2-1.3-.4-2.1-.8-1-.6-1.8-1.2-2.3-1.7.9-.8 3-2.7 5.6-2.7.4 0 .9.1 1.3.1l.9.3c1.3.5 2.7 1.5 3.4 2.3-.7.6-3 2.6-5.6 2.6z" />
			<path d="M11 9.8c.6 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2-1.2-.6-1.2-1.2.6-1.2 1.2-1.2m0-.7c-1 0-1.9.8-1.9 1.9s.8 1.9 1.9 1.9 1.9-.8 1.9-1.9S12 9.1 11 9.1z" />
		</svg>
	);
}

// no visibility by Knut M. Synstad from the Noun Project (heavily edited)
// https://thenounproject.com/term/no-visibility/873044

export function EyeInvisibleIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 22 22" {...props}>
			<path d="M4.6 10.8c.2-.2 3-3.2 6.4-3.2.6 0 1.2.1 1.8.3l-.6.6c-.4-.1-.8-.1-1.3-.1-2.6 0-4.7 1.9-5.6 2.7.7.7 1.5 1.2 2.3 1.7l-.5.5c-.9-.5-1.8-1.2-2.5-2-.1-.2-.1-.4 0-.5z" />
			<path d="M11.4 9.2l-.7.7c-.4.1-.8.5-.9.8l-.7.7V11c0-.9.8-1.8 1.9-1.8.2-.1.3-.1.4 0zM12.9 11c0 1-.8 1.9-1.9 1.9-.1 0-.3 0-.4-.1l.7-.7c.4-.1.7-.4.8-.8l.7-.7v.2c.1.1.1.1.1.2z" />
			<path d="M17.4 11.2c-.2.2-2.9 3.1-6.4 3.2-.6 0-1.2-.1-1.8-.3l.6-.6c.4.1.8.1 1.2.1 2.6 0 4.9-2 5.6-2.7-.7-.7-1.5-1.3-2.3-1.7l.5-.5c.9.5 1.8 1.2 2.5 2 .2.2.2.4.1.5zM4.9 17.1c-.1 0-.2 0-.3-.1-.1-.1-.1-.3 0-.5L16.9 5c.1-.1.4-.1.5 0 .1.1.1.3 0 .5L5.1 17c0 .1-.1.1-.2.1z" />
		</svg>
	);
}

export function ShowMoreIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 22 22" {...props}>
			<path
				d="M11 0a11 11 0 1011 11A11 11 0 0011 0zM6.3 12.5A1.5 1.5 0 117.8 11a1.5 1.5 0 01-1.5 1.5zm4.7 0a1.5 1.5 0 111.5-1.5 1.5 1.5 0 01-1.5 1.5zm4.7 0a1.5 1.5 0 111.5-1.5 1.5 1.5 0 01-1.5 1.5z"
				stroke="#333"
			/>
		</svg>
	);
}

export function TranslationsIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -0.5 11 11" {...props}>
			<path
				d="M8.59 6.12a.13.13 0 01-.13.13H6a3 3 0 00.77 1.93A4.24 4.24 0 007.44 7a.13.13 0 01.17-.08.13.13 0 01.09.08 4.41 4.41 0 01-.75 1.35 4.54 4.54 0 00.92.71.13.13 0 010 .18.13.13 0 01-.11.07h-.07a4.81 4.81 0 01-1-.74 3.41 3.41 0 01-1.47.95.13.13 0 01-.17-.09.13.13 0 01.09-.17 3.14 3.14 0 001.37-.89 3.32 3.32 0 01-.86-2.14h-.7a.13.13 0 010-.27h1.62v-.31a.13.13 0 11.27 0V6h1.62a.13.13 0 01.13.13zM3.37 4.14L1.88.21a.14.14 0 00-.26 0L.13 4.14a.14.14 0 00.08.18.14.14 0 00.13-.09l.36-1h2l.36 1a.14.14 0 00.18.08.14.14 0 00.13-.17zM.86 3L1.75.65 2.65 3z"
			/>
			<path
				fill="none"
				strokeWidth={0.5}
				stroke="#e6e6e6"
				strokeMiterlimit={10}
				d="M1.65 7.68l5.36-5.36"
			/>
		</svg>
	);
}

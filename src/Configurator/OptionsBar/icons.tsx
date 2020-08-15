import * as React from "react";

// visibility by Knut M. Synstad from the Noun Project (edited)
// https://thenounproject.com/term/visibility/873045

export function EyeVisibleIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			fill="#e6e6e6"
			viewBox="0 0 22 22"
			{...props}
		>
			<circle fill="#e6e6e6" cx={11} cy={11} r={1.18} />
			<path
				fill="#e6e6e6"
				d="M5.38 11c.71.7 3 2.7 5.62 2.7s4.91-2 5.62-2.7c-.71-.7-3-2.7-5.62-2.7s-4.91 2-5.62 2.7zm7.5 0A1.88 1.88 0 1111 9.12 1.88 1.88 0 0112.88 11z"
			/>
			<path
				fill="#e6e6e6"
				d="M11 0a11 11 0 1011 11A11 11 0 0011 0zm6.37 11.24c-.12.13-2.88 3.17-6.37 3.17s-6.26-3-6.37-3.17a.35.35 0 010-.47C4.75 10.64 7.51 7.6 11 7.6s6.26 3 6.37 3.17a.35.35 0 010 .47z"
			/>
		</svg>
	);
}

// no visibility by Knut M. Synstad from the Noun Project (edited)
// https://thenounproject.com/term/no-visibility/873044

export function EyeInvisibleIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 22 22" {...props}>
			<path
				d="M11 0a11 11 0 1011 11A11 11 0 0011 0zM4.63 10.76c.23-.24 3-3.17 6.37-3.17a6.7 6.7 0 011.83.27l-.57.58A6.31 6.31 0 0011 8.3c-2.64 0-4.73 1.86-5.62 2.7a11.72 11.72 0 002.29 1.73l-.54.51a10.82 10.82 0 01-2.51-2 .34.34 0 01.01-.48zm6.81-1.59l-.68.68a1.17 1.17 0 00-.88.8l-.73.7a1.83 1.83 0 010-.34A1.88 1.88 0 0111 9.12a2.54 2.54 0 01.44.05zm-6.55 7.92a.36.36 0 01-.25-.1.32.32 0 010-.47L16.86 5a.37.37 0 01.5 0 .32.32 0 010 .47L5.14 17a.36.36 0 01-.25.09zm8-6.09A1.88 1.88 0 0111 12.88a1.76 1.76 0 01-.44-.05l.73-.69a1.19 1.19 0 00.83-.78l.73-.69a1.71 1.71 0 01.03.33zm4.5.23c-.24.24-2.89 3.15-6.38 3.18a6.54 6.54 0 01-1.79-.26l.58-.58a5.26 5.26 0 001.2.13c2.64 0 4.91-2 5.62-2.7a11.46 11.46 0 00-2.29-1.73l.54-.51a11.25 11.25 0 012.51 2 .33.33 0 010 .47z"
				fill="#e6e6e6"
			/>
		</svg>
	);
}

export function ShowMoreIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 22 22" {...props}>
			<path
				d="M11 0a11 11 0 1011 11A11 11 0 0011 0zM6.3 12.5A1.5 1.5 0 117.8 11a1.5 1.5 0 01-1.5 1.5zm4.7 0a1.5 1.5 0 111.5-1.5 1.5 1.5 0 01-1.5 1.5zm4.7 0a1.5 1.5 0 111.5-1.5 1.5 1.5 0 01-1.5 1.5z"
				fill="#e6e6e6"
			/>
		</svg>
	);
}

import * as React from "react";

// Upload by Alice Design from the Noun Project (edited)
// https://thenounproject.com/term/upload/2969619
export function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 97.76 62.79" {...props}>
			<mask id="arrowMask">
				<rect x="0" y="0" width="100" height="100" fill="white" />
				<path d="M44.1,62.8l0-17.5h-6.2c-1.5,0-2.4-1.8-1.5-3l11-14.9c0.8-1,2.3-1,3,0l11,14.9c0.9,1.2,0,3-1.5,3h-6.2v17.5 H44.1z" fill="black" />
			</mask>
			<path mask="url(#arrowMask)" d="M79.54 62.79a18.31 18.31 0 0018.22-18.58c0-10.39-8.13-18.87-18.22-18.87a18.41 18.41 0 00-3.4.32A16.56 16.56 0 0059.79 9.22a16.13 16.13 0 00-5.56 1A22.1 22.1 0 0035.71 0C23.36 0 13.38 10.28 13.38 23a26.77 26.77 0 00.21 2.86A18.68 18.68 0 000 44a18.46 18.46 0 0018.22 18.77z" />
		</svg>
	);
}

// Edit by i cons from the Noun Project
// https://thenounproject.com/term/edit/1072354
export function EditIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 68 68" {...props}>
			<path d="M41.8 12.68l13 13.08-33 33.11L8.85 45.8zm22.9-3.16l-5.81-5.83a5.74 5.74 0 00-8.12 0l-5.58 5.59 13 13.08 6.49-6.52a4.48 4.48 0 00.02-6.32zM2 64.19A1.49 1.49 0 003.83 66l14.51-3.54-13-13.08z" />
		</svg>
	);
}

// Delete by Fantastic from the Noun Project (edited)
// https://thenounproject.com/term/delete/1393049

export function DeleteIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 68 68" {...props}>
			<path d="M60.33 12.15H43.45V9.24A5.2 5.2 0 0038.22 4H29a5.2 5.2 0 00-5.23 5.23v2.91H7.6a1.49 1.49 0 100 3h3.73l3.29 43.32a6 6 0 006 5.53h26.04a6 6 0 006-5.53l3.29-43.32h4.45a1.5 1.5 0 001.49-1.49 1.56 1.56 0 00-1.56-1.5zM26.72 9.24A2.2 2.2 0 0129 7h9.34a2.2 2.2 0 012.24 2.24v2.91H26.72zm-1.27 44.14h-.07a1.48 1.48 0 01-1.5-1.38l-1.49-27.6a1.5 1.5 0 013-.15l1.49 27.56a1.55 1.55 0 01-1.43 1.57zm9.63-1.49a1.49 1.49 0 11-3 0V24.33a1.49 1.49 0 013 0zm8.22.11a1.48 1.48 0 01-1.49 1.42h-.07a1.5 1.5 0 01-1.42-1.57l1.48-27.6a1.55 1.55 0 011.57-1.42 1.5 1.5 0 011.42 1.57z" />
		</svg>
	);
}

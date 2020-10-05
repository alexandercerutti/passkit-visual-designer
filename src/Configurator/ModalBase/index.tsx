import * as React from "react";
import "./style.less";

/**
 * Generic component to create a modal window
 */

export interface ModalProps {
	closeModal(): void;
	contentClassName: string;
}

export default function Modal({ children, closeModal, contentClassName }: React.PropsWithChildren<ModalProps>) {
	const onKeyDownEventRef = React.useRef(({ key }: KeyboardEvent) =>
		key === "Escape" && closeModal()
	);

	React.useEffect(() => {
		document.body.addEventListener("keydown", onKeyDownEventRef.current);
		return () => document.body.removeEventListener("keydown", onKeyDownEventRef.current);
	});

	return (
		<div id="modal">
			<div id="modal-content" className={contentClassName}>
				{children}
			</div>
			<div id="close-underlay" onClick={() => closeModal?.()} />
		</div>
	);
}

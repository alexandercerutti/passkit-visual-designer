import * as React from "react";
import "./style.less";

/**
 * Generic component to create a modal window
 */

export interface ModalProps {
	closeModal(): void;
}

export default function Modal({ children, closeModal }: React.PropsWithChildren<ModalProps>) {
	const onKeyDownEventRef = React.useRef(({ key }: KeyboardEvent) =>
		key === "Escape" && closeModal()
	);

	React.useEffect(() => {
		document.body.addEventListener("keydown", onKeyDownEventRef.current);
		return () => document.body.removeEventListener("keydown", onKeyDownEventRef.current);
	});

	return (
		<div id="modal">
			<div id="modal-content">
				{children}
			</div>
			<div id="close-underlay" onClick={() => closeModal?.()} />
		</div>
	);
}

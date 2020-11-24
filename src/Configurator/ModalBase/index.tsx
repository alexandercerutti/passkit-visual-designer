import * as React from "react";
import ModalCloseIcon from "./icons";
import "./style.less";

/**
 * Generic component to create a modal window
 */

export interface ModalProps {
	closeModal(): void;
	contentUniqueID: string;
}

export default function Modal({ children, closeModal, contentUniqueID }: React.PropsWithChildren<ModalProps>) {
	const onKeyDownEventRef = React.useRef(({ key }: KeyboardEvent) =>
		key === "Escape" && closeModal()
	);

	React.useEffect(() => {
		document.body.addEventListener("keydown", onKeyDownEventRef.current);
		return () => document.body.removeEventListener("keydown", onKeyDownEventRef.current);
	});

	return (
		<div className="modal">
			<ModalCloseIcon id="closeIcon" />
			<div className="modal-content" id={contentUniqueID}>
				{children}
			</div>
			<div className="close-underlay" onClick={() => closeModal?.()} />
		</div>
	);
}

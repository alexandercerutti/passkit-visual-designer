import * as React from "react";
import CommittableTextInput from "../../CommittableTextInput";
import { ArrowIcon, EditIcon } from "../icons";
import "./style.less";

interface Props {
	collectionID: string;
	onBack(): void;
	onCollectionNameChange(value: string): void;
	mediaName: string;
	collectionName?: string;
}

export function ModalNavigation(props: Props) {
	const [editing, setEditing] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>();
	const ghostSpanRef = React.useRef<HTMLSpanElement>();

	React.useEffect(() => {
		if (!inputRef.current) {
			return;
		}

		if (editing) {
			inputRef.current.focus();
		} else {
			inputRef.current.blur();
		}
	}, [editing]);

	/**
	 * This layout effects helps us to use
	 * span element as a ghost-element
	 * to change input element width when its
	 * content changes.
	 */

	React.useLayoutEffect(() => {
		if (!ghostSpanRef.current) {
			return;
		}

		const hiddenSpanStyleSet = editing
			? // hiding span and using it as a ghost element
			  {
					visibility: "hidden",
					pointerEvents: "none",
					position: "absolute",
			  }
			: // Restoring usability and visibility
			  {
					position: "initial",
					visibility: "visible",
					pointerEvents: "auto",
			  };

		Object.assign(ghostSpanRef.current.style, hiddenSpanStyleSet);

		if (inputRef.current) {
			inputRef.current.style.width = ghostSpanRef.current.offsetWidth + "px";
		}
	}, [editing]);

	const onKeyDownHandler = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" || event.key === "Escape") {
			event.currentTarget.blur();
			return;
		}

		if (event.key.length === 1 || event.key === "Backspace") {
			if (event.key.length === 1) {
				ghostSpanRef.current.textContent = `${event.currentTarget.value}${event.key}`;
			}

			inputRef.current.style.width = ghostSpanRef.current.offsetWidth + "px";
		}
	}, []);

	const onCollectionNameEditCommit = React.useCallback(
		(value: string) => {
			setEditing(false);
			props.onCollectionNameChange(value);
		},
		[props.collectionID]
	);

	const onClickEditHandler = React.useCallback(() => !editing && setEditing(true), []);

	const { mediaName, collectionID } = props;
	const collectionName = props.collectionName || "Untitled Collection";

	return (
		<nav className={(collectionID && "allow-back-nav") || ""}>
			<ArrowIcon className="back" onClick={() => props.collectionID && props.onBack()} />
			<div>
				<span>{mediaName}</span>
				{(collectionID && (
					<span id="coll-name" onClick={onClickEditHandler}>
						<span>
							<span ref={ghostSpanRef}>{collectionName || "Untitled collection"}</span>
							{(editing && (
								<CommittableTextInput
									ref={inputRef}
									commit={onCollectionNameEditCommit}
									onKeyDown={onKeyDownHandler}
									defaultValue={collectionName || "Untitled collection"}
								/>
							)) ||
								null}
						</span>
					</span>
				)) ||
					null}
			</div>
			{
				/**
				 * This has been putted here to always show this
				 * icon if we resize the window and show ellipsis.
				 * We might decide to move it inside if we see that
				 * ellipsis will never happen (like, thx to responsiveness).
				 * It only stands on future decisions.
				 * */
				collectionID && <EditIcon onClick={onClickEditHandler} />
			}
		</nav>
	);
}

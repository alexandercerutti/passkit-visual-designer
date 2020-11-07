import * as React from "react";
import { ArrowIcon, EditIcon } from "./icons";

interface Props {
	allowBack: boolean;
	onBack(): void;
	mediaName: string;
	collectionName?: string;
}

export function ModalNavigation(props: Props) {
	const [editing, setEditing] = React.useState(false);
	const editableRef = React.useRef<HTMLInputElement>();

	React.useEffect(() => {
		if (!editableRef.current) {
			return;
		}

		if (editing) {
			editableRef.current.focus();
		} else {
			editableRef.current.blur();
		}
	}, [editing]);

	const onKeyDownHandler = React.useRef(({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) =>
		key === "Enter" && currentTarget.blur()
	);

	const onBlurHandler = React.useRef(() => setEditing(false));
	const onFocusHandler = React.useRef(({ currentTarget }: React.FocusEvent<HTMLInputElement>) =>
		currentTarget.select()
	);

	const onClickEditHandler = React.useRef(() => !editing && setEditing(true));

	const { mediaName, allowBack } = props;
	const collectionName = props.collectionName || "Untitled Collection";

	return (
		<nav className={allowBack && "allow-back-nav" || ""}>
			<ArrowIcon
				className="back"
				onClick={() => props.allowBack && props.onBack()}
			/>
			<div>
				<span>{mediaName}</span>
				{allowBack &&
					<span
						id="coll-name"
						onClick={onClickEditHandler.current}
					>
						<span>
							{!editing
								?
								<span>
									{collectionName || "Untitled collection"}
								</span>
								: <input
									type="text"
									onBlur={onBlurHandler.current}
									onKeyDown={onKeyDownHandler.current}
									onFocus={onFocusHandler.current}
									ref={editableRef}
									defaultValue={collectionName || "Untitled collection"}
								/>
							}
						</span>
					</span> || null
				}
			</div>
			{
				/**
				 * This has been putted here to always show this
				 * icon if we resize the window and show ellipsis.
				 * We might decide to move it inside if we see that
				 * ellipsis will never happen (like, thx to responsiveness).
				 * It only stands on future decisions.
				 * */
				allowBack &&
				<EditIcon onClick={onClickEditHandler.current} />
			}
		</nav>
	);
}

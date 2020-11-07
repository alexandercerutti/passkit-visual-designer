import * as React from "react";
import { ArrowIcon, EditIcon } from "./icons";

interface Props {
	allowBack: boolean;
	onBack(): void;
	mediaName: string;
	collectionName?: string;
}

export function ModalNavigation(props: Props) {
	const { mediaName, allowBack } = props;
	const collectionName = props.collectionName || "Untitled Collection";

	return (
		<nav className={allowBack && "allow-back-nav" || ""}>
			<ArrowIcon
				className="back"
				onClick={() => allowBack && props.onBack()}
			/>
			<p>
				{mediaName}
				{allowBack &&
					<span id="coll-name">{collectionName || "Untitled collection"}</span> || null
				}
			</p>
			{
				allowBack &&
				<EditIcon onClick={(e) => void 0} />
			}
		</nav>
	);
}

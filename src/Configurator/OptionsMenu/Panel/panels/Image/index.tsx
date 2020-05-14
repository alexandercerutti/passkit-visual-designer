import * as React from "react";
import { PanelProps } from "../..";
import UploadArea from "./UploadArea";
import "./style.less";
import { EditIcon, DeleteIcon } from "./icons";

interface ImagePanelProps extends PanelProps {
	value?: string;
}

export default function ImagePanel(props: ImagePanelProps) {
	const [file, setFile] = React.useState<File>(null);
	const showTitle = props.name.replace(/([a-z])([A-Z])/g, "$1 $2");

	const onChosenFileChangedHandlerRef = React.useRef((file?: File) => {
		setFile(file);
		props.onValueChange(props.name, file);
	});

	return (
		<div className="panel image" data-name={props.name}>
			<h4>{showTitle}</h4>
			{file
				? <PictureShowdown
					name={props.name}
					pictureData={file}
					onDelete={onChosenFileChangedHandlerRef.current}
				/>
				: <UploadArea onFileUpload={onChosenFileChangedHandlerRef.current} />
			}
		</div>
	);
}

interface PictureShowdownProps {
	name: string;
	pictureData: Blob;
	onDelete: () => void;
}

function PictureShowdown(props: PictureShowdownProps): JSX.Element {
	const [pictureURL, setPictureURL] = React.useState(null);

	React.useEffect(() => {
		if (pictureURL !== props.pictureData) {
			URL.revokeObjectURL(pictureURL);
			setPictureURL(URL.createObjectURL(props.pictureData));
		}

		if (!props.pictureData) {
			props.onDelete();
		}

		return () => URL.revokeObjectURL(pictureURL);
	}, [props.pictureData]);

	return (
		<div className="picture">
			<img src={pictureURL} alt={props.name} />
			<div className="opts">
				<div>
					<EditIcon fill="#e6e6e6" />
				</div>
				<div onClick={props.onDelete}>
					<DeleteIcon fill="#e6e6e6" />
				</div>
			</div>
		</div>
	);
}

import * as React from "react";

export default function useObjectURL(data: ArrayBuffer | Blob, bufferBlobOpts?: BlobPropertyBag) {
	const [objectURL, setObjectURL] = React.useState<string>(undefined);

	React.useEffect(() => {
		const blob = data instanceof Blob ? data : new Blob([data], bufferBlobOpts);
		const newObjectURL = URL.createObjectURL(blob);
		setObjectURL(newObjectURL);

		if (objectURL) {
			URL.revokeObjectURL(objectURL);
		}

		return () => URL.revokeObjectURL(newObjectURL);
	}, [data]);

	return objectURL;
}

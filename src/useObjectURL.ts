import * as React from "react";

/**
 * Allows creating an ObjectURL from a Blob or raw data
 * for any kind of data a Blob can accept.
 *
 * @param data
 * @param bufferBlobOpts
 */

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

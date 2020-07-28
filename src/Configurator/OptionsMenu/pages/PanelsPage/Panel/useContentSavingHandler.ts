import { useState, useCallback } from "react";

export default function useContentSavingHandler<T>(onValueChange: (name: string, content: T) => void, panelName: string, initialContent?: T): [T, (content?: T) => void] {
	const [content, setContent] = useState<T>(initialContent || null);

	const onContentChangedHandlerRef = useCallback((newContent?: T) => {
		if (!newContent && !content) {
			return;
		}

		setContent(newContent);
		onValueChange(panelName, newContent);
	}, [content]);

	return [content, onContentChangedHandlerRef];
}

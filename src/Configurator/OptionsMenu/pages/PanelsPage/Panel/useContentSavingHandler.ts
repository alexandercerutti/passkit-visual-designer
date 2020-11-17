import { useState, useCallback } from "react";

export type ContentSavingHandler<T> = [content: T, handler: (content?: T) => void];

export default function useContentSavingHandler<T>(onValueChange: (name: string, content: T) => void, panelName: string, initialContent?: T): ContentSavingHandler<T> {
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

import { useState, useRef } from "react";

export default function useContentSavingHandler<T>(onValueChange: (name: string, content: T) => void, panelName: string, initialContent?: T): [T, (content?: T) => void] {
	const [content, setContent] = useState<T>(initialContent || null);

	const onContentChangedHandlerRef = useRef((content?: T) => {
		setContent(content);
		onValueChange(panelName, content);
	});

	return [content, onContentChangedHandlerRef.current];
}

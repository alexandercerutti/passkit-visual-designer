import * as React from "react";
import Prism from "prismjs";
import { PassFieldKeys, PassFields } from "../../../../../Pass/constants";
import "./style.less";
import { createClassName } from "../../../../../utils";

interface Props {
	fieldName: keyof PassFields;
	content: PassFieldKeys[];
	onChange(jsonString: string): void;
}

export default function DrawerJSONEditor(props: Props) {
	const [jsonValid, setJSONValidityState] = React.useState(true);
	const codeRef = React.useRef<HTMLElement>();
	const textAreaRef = React.useRef<HTMLTextAreaElement>();
	const jsonValidityCheckTimeoutRef = React.useRef<number>();
	const openingContent = `{\n\t${props.fieldName}: [`;
	const closingContent = `\t]\n}`;

	React.useEffect(() => {
		textAreaRef.current.focus();
	}, []);

	React.useEffect(() => {
		if (jsonValid && JSON.stringify(props.content, null, "\t") !== textAreaRef.current.value) {
			props.onChange(`[${textAreaRef.current.value}]`);
		}
	}, [jsonValid]);

	const onKeyDownHandler = React.useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const { value, selectionStart: start, selectionEnd: end } = event.currentTarget;

		if (jsonValidityCheckTimeoutRef.current) {
			clearInterval(jsonValidityCheckTimeoutRef.current);
			jsonValidityCheckTimeoutRef.current = undefined;
		}

		jsonValidityCheckTimeoutRef.current = window.setTimeout(() => {
			try {
				JSON.parse(`[${textAreaRef.current.value}]`);
				setJSONValidityState(true);
			} catch (err) {
				setJSONValidityState(false);
			}
		}, 500);

		if (event.key === "Enter") {
			event.preventDefault();
			const rows = value.split(/\r*\n/);
			const lastestRow = rows[rows.length - 1];
			const previousIndentation = lastestRow.match(/^[\t]+/g)?.[0]?.length || 0;

			event.currentTarget.value = `${value.substring(0, start)}\n${"\t".repeat(
				previousIndentation
			)}${value.substring(end)}`;
			// put caret at right position again
			event.currentTarget.selectionStart = event.currentTarget.selectionEnd = start + 1;
			return;
		}

		if (event.key === "Tab") {
			event.preventDefault();

			// set textarea value to: text before caret + tab + text after caret
			event.currentTarget.value = `${value.substring(0, start)}${"\t"}${value.substring(end)}`;
			// put caret at right position again
			event.currentTarget.selectionStart = event.currentTarget.selectionEnd = start + 1;
			return;
		}
	}, []);

	return (
		<div className="json-editor">
			<pre className="language-json">
				<code
					ref={codeRef}
					dangerouslySetInnerHTML={{
						__html: Prism.highlight(openingContent, Prism.languages["json"], "json"),
					}}
				/>
			</pre>
			<textarea
				ref={textAreaRef}
				spellCheck={false}
				onKeyDown={onKeyDownHandler}
				defaultValue={props.content
					.map((content) => JSON.stringify(content, null, "\t"))
					.join(",\n")}
			/>
			<pre className="language-json">
				<code
					ref={codeRef}
					dangerouslySetInnerHTML={{
						__html: Prism.highlight(closingContent, Prism.languages["json"], "json"),
					}}
				/>
			</pre>
			<div
				className={createClassName(["json-validity-alert"], {
					valid: jsonValid,
					invalid: !jsonValid,
				})}
			/>
		</div>
	);
}

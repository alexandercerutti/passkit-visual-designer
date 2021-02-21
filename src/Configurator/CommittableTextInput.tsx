import * as React from "react";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
	selectOnFocus?: boolean;
	commit(content: string): void;
}

export default React.forwardRef(function CommittableTextInput(props: Props, ref: React.RefObject<HTMLInputElement>) {
	const { commit, selectOnFocus, onFocus, onFocusCapture, onBlur, onBlurCapture, onKeyDown, onKeyDownCapture, ...inputProps } = props;

	const onFocusHandler = React.useCallback((event: React.FocusEvent<HTMLInputElement>) => {
		if (selectOnFocus) {
			// To select all the text in the input - figma style
			event.currentTarget.select();
		}

		onFocus?.(event);
		onFocusCapture?.(event);
	}, [selectOnFocus, onFocus, onFocusCapture]);

	const onKeyDownHandler = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
		const {key, currentTarget} = event;

		if (key === "Enter") {
			currentTarget.blur();
		}

		onKeyDown?.(event);
		onKeyDownCapture?.(event);
	}, [onKeyDown, onKeyDownCapture]);

	const onBlurHandler = React.useCallback((event: React.FocusEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		commit(value || undefined);

		onBlur?.(event);
		onBlurCapture?.(event);
	}, [commit, onBlur, onBlurCapture]);

	return (
		<input
			ref={ref}
			type="text"
			onFocus={onFocusHandler}
			onKeyDown={onKeyDownHandler}
			onBlur={onBlurHandler}
			{...inputProps}
		/>
	);
})

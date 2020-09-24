import { PassMixedProps, MediaProps } from "../Pass";

export interface State {
	pass: Partial<PassMixedProps>;
	media: Partial<MediaProps>;
	rawMedia: Partial<Record<keyof MediaProps, ArrayBuffer>>;
	projectOptions: {
		title?: string
	};
}

export const initialState: State = {
	pass: {},
	media: {},
	rawMedia: {},
	projectOptions: {},
}

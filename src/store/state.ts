import { PassKind } from "../model";
import { PassAlternative } from "../PassSelector";

export interface State {
	selectedPass: {
		selectedKind: PassKind;
		selectedAlternative: PassAlternative;
	}
}

export const initialState: State = {
	selectedPass: {
		selectedKind: null,
		selectedAlternative: null,
	}
}

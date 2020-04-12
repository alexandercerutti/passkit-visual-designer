import selectedPass from "./PassSelector/reducers";
import passContent from "./Configurator/reducers";
import { combineReducers } from "redux";
import { State } from "./state";

export default combineReducers<State>({
	selectedPass,
	passContent
});

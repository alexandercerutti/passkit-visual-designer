import { combineReducers } from "redux";
import { State } from ".";
import pass from "./pass";
import media from "./media";
import projectOptions from "./projectOptions";

export default combineReducers<State>({
	pass,
	media,
	projectOptions,
});

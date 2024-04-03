import type {DevToolsState} from "./types";
import {AllStatesOption} from "../constants";

export const initialState: DevToolsState = {
	selectedState: AllStatesOption,
	messageDetails: [],
	viewMode: "tree",
};

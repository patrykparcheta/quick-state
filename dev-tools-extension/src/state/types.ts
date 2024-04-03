import type {DevToolsStateUpdateMessage} from "@quickstate/core";
import {ViewOptions} from "../constants";

export interface DevToolsState {
	messageDetails: Array<DevToolsStateUpdateMessage>;
	selectedState: string | null;
	viewMode: keyof typeof ViewOptions;
}

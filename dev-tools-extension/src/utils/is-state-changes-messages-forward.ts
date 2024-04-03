import {StateChangesMessagesForward} from "../types";
import {isDevToolsStateUpdateMessage} from "./is-dev-tools-state-update-message";

export const isStateChangesMessagesForward = (obj: any): obj is StateChangesMessagesForward =>
	obj?.type === "STATE_CHANGES_MESSAGES_FORWARD" && isDevToolsStateUpdateMessage(obj?.message);

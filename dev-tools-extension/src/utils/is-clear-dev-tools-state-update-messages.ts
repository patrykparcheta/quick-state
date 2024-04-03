import type {ClearDevToolsStateUpdateMessages} from "../types";

export const isClearDevToolsStateUpdateMessages = (obj: any): obj is ClearDevToolsStateUpdateMessages =>
	obj?.type === "CLEAR_DEV_TOOLS_STATE_UPDATE_MESSAGES";

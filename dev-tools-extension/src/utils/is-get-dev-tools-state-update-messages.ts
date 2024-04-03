import type {GetDevToolsStateUpdateMessages} from "../types";

export const isGetDevToolsStateUpdateMessages = (obj: any): obj is GetDevToolsStateUpdateMessages =>
	obj?.type === "GET_DEV_TOOLS_STATE_UPDATE_MESSAGES";

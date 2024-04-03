import type {GetDevToolsStateUpdateMessagesResult} from "../types";

export const isGetDevToolsStateUpdateMessagesResult = (obj: any): obj is GetDevToolsStateUpdateMessagesResult =>
	Array.isArray(obj?.messages);

import {type DevToolsStateUpdateMessage, MessageTypes} from "@quickstate/core";

export const isDevToolsStateUpdateMessage = (obj: any): obj is DevToolsStateUpdateMessage =>
	obj &&
	typeof obj === "object" &&
	"type" in obj &&
	obj.type === MessageTypes.stateChange &&
	"data" in obj &&
	typeof obj.data === "object";

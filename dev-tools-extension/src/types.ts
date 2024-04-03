import type {DevToolsStateUpdateMessage} from "@quickstate/core";

export type GetDevToolsStateUpdateMessagesResult = {
	messages: Array<DevToolsStateUpdateMessage>;
};

export type StateChangesMessagesForward = {
	type: "STATE_CHANGES_MESSAGES_FORWARD";
	message: DevToolsStateUpdateMessage;
};

export type GetDevToolsStateUpdateMessages = {
	type: "GET_DEV_TOOLS_STATE_UPDATE_MESSAGES";
};

export type NewForwardedMessageReceived = {
	type: "NEW_FORWARDED_MESSAGE_RECEIVED";
};

export type ClearDevToolsStateUpdateMessages = {
	type: "CLEAR_DEV_TOOLS_STATE_UPDATE_MESSAGES";
};

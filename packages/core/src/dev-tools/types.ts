import type {
	AsyncActionBeforeExecuteMeta,
	AsyncActionFulfilledMeta,
	AsyncActionPendingMeta,
	AsyncActionRejectedMeta,
} from "../types";
import {MessageTypes} from "./constants";

export type StateUpdateVariants =
	| StateChangeKeyValueDetail
	| StateChangeSetStateDetail
	| StateChangeActionDetail
	| StateChangeActionWithPayloadDetail
	| StateChangeAsyncActionDetail;

export interface StateUpdateEvent {
	newState: any;
	oldState: any;
	actionDetails: StateUpdateVariants;
	storeName?: string;
	timestamp: number;
}

export type DevToolsStateUpdateMessage<MessageTypeOptions = typeof MessageTypes> = {
	type: MessageTypeOptions[keyof MessageTypeOptions];
	data: StateUpdateEvent;
};

export interface StateChangeNotificationProps {
	newState: any;
	oldState: any;
	storeName: string;
	actionDetails: StateUpdateVariants;
}

export interface StateChangeSetStateDetail {
	actionName?: string;
	type: "setState";
}

export interface StateChangeKeyValueDetail {
	actionName?: string;
	type: "keyValue";
}

export interface StateChangeActionDetail {
	actionName?: string;
	type: "action";
}
export interface StateChangeActionWithPayloadDetail {
	actionName?: string;
	type: "payloadAction";
	payload: any;
}

export interface StateChangeAsyncActionDetail {
	actionName?: string;
	type: "asyncAction";
	stage: "beforeExecute" | "pending" | "fulfilled" | "rejected";
	meta:
		| AsyncActionBeforeExecuteMeta<any>
		| AsyncActionPendingMeta<any>
		| AsyncActionFulfilledMeta<any>
		| AsyncActionRejectedMeta<any>;
}

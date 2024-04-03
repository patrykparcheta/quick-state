import type {NewForwardedMessageReceived} from "../types";

export const isNewForwardedMessageReceived = (obj: any): obj is NewForwardedMessageReceived =>
	obj?.type === "NEW_FORWARDED_MESSAGE_RECEIVED";

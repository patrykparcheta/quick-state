import browser from "webextension-polyfill";
import type {DevToolsStateUpdateMessage} from "@quickstate/core";
import {isStateChangesMessagesForward, isGetDevToolsStateUpdateMessages} from "./utils";
import type {NewForwardedMessageReceived} from "./types";
import {isClearDevToolsStateUpdateMessages} from "./utils/is-clear-dev-tools-state-update-messages";

let messages: Array<DevToolsStateUpdateMessage> = [];

browser.runtime.onMessage.addListener((payload) => {
	if (isStateChangesMessagesForward(payload)) {
		messages.push(payload.message);

		try {
			const message: NewForwardedMessageReceived = {
				type: "NEW_FORWARDED_MESSAGE_RECEIVED",
			};

			browser.runtime.sendMessage(message).catch((error) => {
				console.error("Error sending message: ", error);
			});
		} catch (e) {
			console.error("Error handling message: ", e);
		}
	}
});

browser.runtime.onMessage.addListener((message) => {
	if (isGetDevToolsStateUpdateMessages(message)) {
		return Promise.resolve({messages});
	}
});

browser.runtime.onMessage.addListener((message) => {
	if (isClearDevToolsStateUpdateMessages(message)) {
		messages = [];
	}
});

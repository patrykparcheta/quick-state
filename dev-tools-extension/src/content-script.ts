import browser from "webextension-polyfill";
import {QuickStateDevToolsNotify} from "@quickstate/core";
import type {StateChangesMessagesForward} from "./types";

window.addEventListener(QuickStateDevToolsNotify, (evt) => {
	if (evt.type === QuickStateDevToolsNotify) {
		try {
			const event = evt as CustomEvent;

			const message: StateChangesMessagesForward = {
				type: "STATE_CHANGES_MESSAGES_FORWARD",
				message: JSON.parse(event.detail),
			};

			browser.runtime.sendMessage(message).catch((error) => console.error("Error sending message: ", error));
		} catch (e) {
			/* empty */
		}
	}
});

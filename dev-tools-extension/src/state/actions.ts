import {createAction} from "./store";
import type {DevToolsStateUpdateMessage} from "@quickstate/core";
import {isDevelopment, isDevToolsStateUpdateMessage} from "../utils";
import browser from "webextension-polyfill";
import type {ClearDevToolsStateUpdateMessages} from "../types";
import {AllStatesOption, UnnamedStatesId} from "../constants";

export const receivedMessagesAction = createAction<Array<DevToolsStateUpdateMessage>>((state, payload) => {
	state.messageDetails = payload.reduce<Array<DevToolsStateUpdateMessage>>((acc, message) => {
		if (isDevToolsStateUpdateMessage(message)) {
			acc.push({
				...message,
				data: {
					...message.data,
					storeName: message.data.storeName || UnnamedStatesId,
				},
			});
		}

		return acc;
	}, []);

	const selectedStateExistsInMessageDetailsList = state.messageDetails.some(
		(m) => m.data.storeName === state.selectedState
	);

	if (!selectedStateExistsInMessageDetailsList) {
		state.selectedState = AllStatesOption;
	}
});

export const clearMessageDetailsList = createAction((state) => {
	state.messageDetails = [];

	if (!isDevelopment()) {
		const message: ClearDevToolsStateUpdateMessages = {
			type: "CLEAR_DEV_TOOLS_STATE_UPDATE_MESSAGES",
		};

		browser.runtime.sendMessage(message);
	}
});

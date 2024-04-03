import browser from "webextension-polyfill";
import {receivedMessagesAction} from "../state";
import {useEffect} from "react";
import type {GetDevToolsStateUpdateMessagesResult, GetDevToolsStateUpdateMessages} from "../types";
import {isDevelopment} from "../utils";
import {isGetDevToolsStateUpdateMessagesResult, isNewForwardedMessageReceived} from "../utils";

export const useGetMessages = () => {
	const getDevToolsStateUpdateMessages = () => {
		if (!isDevelopment()) {
			const message: GetDevToolsStateUpdateMessages = {
				type: "GET_DEV_TOOLS_STATE_UPDATE_MESSAGES",
			};

			browser.runtime.sendMessage(message).then((response: GetDevToolsStateUpdateMessagesResult) => {
				if (isGetDevToolsStateUpdateMessagesResult(response)) {
					receivedMessagesAction(response.messages);
				}
			});
		}
	};

	useEffect(() => {
		const handleOnMessage = (message: any) => {
			if (isNewForwardedMessageReceived(message)) {
				getDevToolsStateUpdateMessages();
			}
		};

		if (!isDevelopment()) {
			browser.runtime.onMessage.addListener(handleOnMessage);
		}

		return () => {
			if (!isDevelopment()) {
				browser.runtime.onMessage.removeListener(handleOnMessage);
			}
		};
	}, []);

	useEffect(() => {
		getDevToolsStateUpdateMessages();
	}, []);
};

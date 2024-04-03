import {QuickStateDevToolsNotify, MessageTypes} from "./constants";
import type {DevToolsStateUpdateMessage, StateChangeNotificationProps} from "./types";

export const isDevelopment = () => process.env.NODE_ENV !== "production";

const getCurrentTimestamp = () => {
	const date = new Date();
	return date.getTime();
};

const sendBrowserMessage = (messageDetails: DevToolsStateUpdateMessage) => {
	try {
		const event = new CustomEvent(QuickStateDevToolsNotify, {
			detail: JSON.stringify(messageDetails),
		});

		window.dispatchEvent(event);
	} catch (e) {
		/* empty */
	}
};

export const notifyDevToolsOfStateChange = ({
	newState,
	oldState,
	actionDetails,
	storeName,
}: StateChangeNotificationProps) => {
	if (!isDevelopment()) {
		return;
	}

	sendBrowserMessage({
		type: MessageTypes.stateChange,
		data: {newState, oldState, actionDetails, storeName, timestamp: getCurrentTimestamp()},
	});
};

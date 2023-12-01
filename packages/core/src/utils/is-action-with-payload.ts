import type {Action, ActionWithPayload} from "../types";

export const isActionWithPayload = <State extends object, Payload>(
	action: Action<State> | ActionWithPayload<State, Payload>
): action is ActionWithPayload<State, Payload> => action.length === 2;

import type {Action, ActionWithPayload, Store, TransformState} from "./types";
import {isActionWithPayload} from "./utils";
import type {StateChangeActionDetail, StateChangeActionWithPayloadDetail} from "./dev-tools";

export const createActionImpl =
	<State extends object>(transformState: TransformState<State>): Store<State>["createAction"] =>
	<Payload>(action: Action<State> | ActionWithPayload<State, Payload>, actionName) => {
		return function (this: any, ...args: unknown[]) {
			if (isActionWithPayload(action)) {
				const payload = args[0] as Payload;

				const stateChangeActionWithPayloadDetail: StateChangeActionWithPayloadDetail = {
					actionName,
					type: "payloadAction",
					payload,
				};

				return void transformState((state) => action(state, payload), stateChangeActionWithPayloadDetail);
			}

			const stateChangeActionDetail: StateChangeActionDetail = {
				actionName,
				type: "action",
			};

			transformState(action, stateChangeActionDetail);
		} as any;
	};

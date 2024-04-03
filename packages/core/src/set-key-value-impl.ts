import type {Store, TransformState} from "./types";
import type {StateChangeKeyValueDetail} from "./dev-tools";

export const setKeyValueImpl =
	<State extends object>(transformState: TransformState<State>): Store<State>["setKeyValue"] =>
	(key, value, actionName) => {
		const stateChangeKeyValueDetail: StateChangeKeyValueDetail = {
			actionName,
			type: "keyValue",
		};

		return transformState((state) => {
			const keyName = key as string;
			const existingValue = state[keyName];
			if (
				typeof existingValue === "object" &&
				existingValue !== null &&
				typeof value === "object" &&
				value !== null
			) {
				state[keyName] = Object.assign({}, existingValue, value);
			} else {
				state[keyName] = value;
			}
		}, stateChangeKeyValueDetail);
	};

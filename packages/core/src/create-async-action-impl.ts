import {
	AsyncActionBeforeExecuteMeta,
	AsyncActionCreator,
	AsyncActionFulfilledMeta,
	AsyncActionPendingMeta,
	AsyncActionRejectedMeta,
	AsyncActionWithPayload,
	GetState,
	Store,
	TransformState,
} from "./types";
import type {StateChangeAsyncActionDetail} from "./dev-tools";
import {isAsyncActionShouldExecuteResult} from "./utils";

export const createAsyncActionImpl =
	<State extends object, Transform extends TransformState<State>>(
		getState: GetState<State>,
		transformState: Transform
	): Store<State>["createAsyncAction"] =>
	<Creator extends AsyncActionCreator>(action: AsyncActionWithPayload<State, Creator>, actionName) => {
		return async function (this: any, ...args: Parameters<Creator>) {
			const {creator, onRejected, onFulfilled, onPending, beforeExecute} = action;

			try {
				let beforeExecuteMeta: AsyncActionBeforeExecuteMeta<Creator> = {
					parameters: args,
					shouldExecute: true,
				};

				if (beforeExecute) {
					const stateChangeAsyncActionBeforeExecuteDetail: StateChangeAsyncActionDetail = {
						actionName,
						meta: beforeExecuteMeta,
						stage: "beforeExecute",
						type: "asyncAction",
					};

					const result = beforeExecute(getState(), beforeExecuteMeta);

					if (isAsyncActionShouldExecuteResult(result)) {
						beforeExecuteMeta = {
							...beforeExecuteMeta,
							shouldExecute: result.shouldExecute,
						};

						if (result?.stateModifier) {
							transformState(
								(draft) => result.stateModifier && result.stateModifier(draft, beforeExecuteMeta),
								stateChangeAsyncActionBeforeExecuteDetail
							);
						}
					}
				}

				if (!beforeExecuteMeta.shouldExecute) {
					return beforeExecuteMeta;
				}

				const pendingMeta: AsyncActionPendingMeta<Creator> = {
					parameters: args,
				};

				const stateChangeAsyncActionPendingDetail: StateChangeAsyncActionDetail = {
					actionName,
					meta: pendingMeta,
					stage: "pending",
					type: "asyncAction",
				};

				transformState((draft) => onPending(draft, pendingMeta), stateChangeAsyncActionPendingDetail);

				const resolvedValue = await creator(...args);

				const fulfilledMeta: AsyncActionFulfilledMeta<Creator> = {
					parameters: args,
					result: resolvedValue as Awaited<ReturnType<Creator>>,
				};

				const stateChangeAsyncActionFulfilledDetail: StateChangeAsyncActionDetail = {
					actionName,
					meta: pendingMeta,
					stage: "fulfilled",
					type: "asyncAction",
				};

				transformState((draft) => onFulfilled(draft, fulfilledMeta), stateChangeAsyncActionFulfilledDetail);

				return fulfilledMeta;
			} catch (e) {
				const rejectedMeta: AsyncActionRejectedMeta<Creator> = {
					parameters: args,
					reason: e,
				};

				const stateChangeAsyncActionRejectedDetail: StateChangeAsyncActionDetail = {
					actionName,
					meta: rejectedMeta,
					stage: "rejected",
					type: "asyncAction",
				};

				transformState((draft) => onRejected(draft, rejectedMeta), stateChangeAsyncActionRejectedDetail);

				return rejectedMeta;
			}
		};
	};

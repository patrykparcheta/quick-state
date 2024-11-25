import type {AsyncActionCreator, AsyncActionShouldExecuteResult} from "../types";

export const isAsyncActionShouldExecuteResult = <State extends object, Creator extends AsyncActionCreator>(
	obj: any
): obj is AsyncActionShouldExecuteResult<State, Creator> =>
	obj !== null && typeof obj === "object" && "shouldExecute" in obj && typeof obj.shouldExecute === "boolean";

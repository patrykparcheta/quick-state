import {isAsyncActionShouldExecuteResult} from "./is-async-action-should-execute-result";

describe("isAsyncActionShouldExecute type guard", () => {
	it("returns true for objects with shouldExecute boolean property", () => {
		const obj: any = {shouldExecute: true};
		expect(isAsyncActionShouldExecuteResult(obj)).toBeTruthy();
	});

	it("returns false for objects without shouldExecute property", () => {
		const obj: any = {otherProperty: 123};
		expect(isAsyncActionShouldExecuteResult(obj)).toBeFalsy();
	});

	it("returns false for objects with shouldExecute non-boolean property", () => {
		const obj: any = {shouldExecute: "yes"};
		expect(isAsyncActionShouldExecuteResult(obj)).toBeFalsy();
	});

	it("returns false for null", () => {
		const obj: any = null;
		expect(isAsyncActionShouldExecuteResult(obj)).toBeFalsy();
	});

	it("returns false for undefined", () => {
		const obj: any = undefined;
		expect(isAsyncActionShouldExecuteResult(obj)).toBeFalsy();
	});

	it("returns false for non-object types", () => {
		expect(isAsyncActionShouldExecuteResult(123)).toBeFalsy();
		expect(isAsyncActionShouldExecuteResult("string")).toBeFalsy();
		expect(isAsyncActionShouldExecuteResult(true)).toBeFalsy();
	});
});

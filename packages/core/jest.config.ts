import type {Config} from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	projects: ["<rootDir>"],
	testMatch: ["<rootDir>/**/*.(spec|test).ts"],
	moduleFileExtensions: ["js", "ts", "tsx"],
};

export default config;

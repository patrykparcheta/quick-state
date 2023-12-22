import {defineBuildConfig} from "unbuild";

export default defineBuildConfig({
	entries: ["./src/index.ts"],
	declaration: true,
	failOnWarn: false,
	clean: true,
	rollup: {
		emitCJS: true,
		inlineDependencies: true,
	},
});

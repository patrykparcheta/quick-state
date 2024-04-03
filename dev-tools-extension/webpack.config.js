// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require("path");

// eslint-disable-next-line no-undef
module.exports = {
	mode: "production",
	entry: {
		background: "./src/background.ts",
		devtools: "./src/devtools.ts",
		"content-script": "./src/content-script.ts",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							// eslint-disable-next-line no-undef
							configFile: path.resolve(__dirname, "./tsconfig.extension.json"),
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "[name].js",
		// eslint-disable-next-line no-undef
		path: path.resolve(__dirname, "build"),
	},
};

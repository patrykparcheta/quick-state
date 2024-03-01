// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const project = path.resolve(__dirname, "tsconfig.eslint.json");

module.exports = {
	parserOptions: {
		project,
	},
	settings: {
		"import/resolver": {
			typescript: {project},
		},
	},
};
